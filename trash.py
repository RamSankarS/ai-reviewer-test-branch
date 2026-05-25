from flask import Flask, request, render_template_string
import urllib.request
import xml.etree.ElementTree as ET
import jwt

app = Flask(__name__)

# 1. CRITICAL: Hardcoded JWT Secret Key
# The AI should immediately flag this as a compromised token risk.
JWT_SECRET = "super_secret_admin_jwt_key_2026"

@app.route('/fetch_image')
def fetch_image():
    # 2. CRITICAL: Server-Side Request Forgery (SSRF)
    # An attacker can pass ?url=http://169.254.169.254/latest/meta-data/ 
    # to steal internal AWS IAM cloud credentials.
    target_url = request.args.get('url')
    try:
        response = urllib.request.urlopen(target_url)
        return response.read()
    except:
        # 3. WARNING: Swallowing exceptions (again)
        return "Image load failed"

@app.route('/welcome')
def welcome():
    # 4. CRITICAL: Reflected Cross-Site Scripting (XSS)
    # Passing user input directly into an HTML string without escaping.
    # An attacker can inject <script> tags to steal user cookies.
    name = request.args.get('name', 'Guest')
    template = f"<h1>Welcome to the Alaris dashboard, {name}!</h1>"
    return render_template_string(template)

@app.route('/upload_xml', methods=['POST'])
def parse_xml():
    # 5. CRITICAL: XML External Entity (XXE) Injection
    # Using the standard ElementTree parser securely parses XML, but allows 
    # malicious XML payloads to read internal server files like /etc/passwd.
    xml_data = request.data
    try:
        root = ET.fromstring(xml_data)
        return f"Successfully parsed: {root.tag}"
    except Exception as e:
        return "Failed to parse XML"

@app.route('/quick_math')
def calculate():
    # 6. CRITICAL: Arbitrary Code Execution (CWE-94)
    # Never, ever use eval() on user input. 
    # Attacker payload: ?expr=__import__('os').popen('rm -rf /').read()
    math_expr = request.args.get('expr')
    try:
        result = eval(math_expr)
        return f"Your result is: {result}"
    except:
        return "Invalid math expression"

if __name__ == "__main__":
    # 7. WARNING: Running Flask in debug mode exposes the Werkzeug debugger console
    app.run(host='0.0.0.0', port=8080, debug=True)
