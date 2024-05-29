from flask import Flask, render_template, request, redirect, session


app = Flask(__name__)

@app.route("/")
def pagina_inicial():
    return render_template('index.html')

@app.route("/cep")
def pagina_cep():
    return render_template('cep.html')

@app.route("/tempo")
def pagina_tempo():
    return render_template('tempo.html')

if __name__ == "__main__":
    app.run(debug=True)