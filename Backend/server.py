from flask import Flask, request, jsonify
from flask_cors import CORS
from db_config import get_connection

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

@app.route('/products', methods=['GET'])
def get_products():
    conn = get_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM products")
    result = cursor.fetchall()
    conn.close()
    return jsonify(result)

@app.route('/products', methods=['POST'])
def add_product():
    data = request.json
    conn = get_connection()
    cursor = conn.cursor()
    sql = "INSERT INTO products (product_name, price, old_price, category_type, is_active, description) VALUES (%s, %s, %s, %s, %s, %s)"
    cursor.execute(sql, (data['product_name'], data['price'], data['old_price'], data['category_type'], data['is_active'], data['description']))
    conn.commit()
    conn.close()
    return jsonify({'message': 'Product added successfully'})

@app.route('/products/<int:id>', methods=['PUT'])
def update_product(id):
    data = request.json
    conn = get_connection()
    cursor = conn.cursor()
    sql = "UPDATE products SET product_name=%s, price=%s, old_price=%s, category_type=%s, is_active=%s, description=%s WHERE id=%s"
    cursor.execute(sql, (data['product_name'], data['price'], data['old_price'], data['category_type'], data['is_active'], data['description'], id))
    conn.commit()
    conn.close()
    return jsonify({'message': 'Product updated successfully'})

@app.route('/products/<int:id>', methods=['DELETE'])
def delete_product(id):
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("DELETE FROM products WHERE id=%s", (id,))
    conn.commit()
    conn.close()
    return jsonify({'message': 'Product deleted successfully'})

if __name__ == '__main__':
    app.run(debug=True)