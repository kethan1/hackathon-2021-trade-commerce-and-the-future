from flask import *
import os
import json

app = Flask(__name__)


@app.route("/")
def home():
    return render_template("home.html", stores=os.listdir("static/stores"))


@app.route("/api/get_stores")
def get_stores():
    return os.listdir("static/stores")


@app.route("/api/get_store_images/<store>")
def get_store_images(store):
    return f"/static/stores/{store}/store_complex.png"


@app.route("/api/get_store_products/<store>")
def get_store_products(store):
    path = f"static/stores/{store}/products.json"
    with open(path) as store_products:
        store_products_json = json.load(store_products)
        return {"items": store_products_json["items"], "items_positioning": store_products_json["items_positioning"]}


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0")
