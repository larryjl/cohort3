import sqlite3
from flask_restful import reqparse, Resource
from flask_jwt import jwt_required


class Item(Resource):
    TABLE_NAME = 'items'

    parser = reqparse.RequestParser()
    parser.add_argument(
        "price", 
        type=float, 
        required=True, 
        help="This field cannot be left blank!"
    )

    @classmethod
    def find_by_name(cls, name):
        connection = sqlite3.connect('data.db')
        cursor = connection.cursor()

        query = f"SELECT * FROM {cls.TABLE_NAME} WHERE name =?"
        result = cursor.execute(query, (name,))

        row = result.fetchone()
        connection.close()

        if row:
            return {'item': {'name': row[0], 'price': row[1]}}

    @classmethod
    def insert(cls, item):
        connection = sqlite3.connect('data.db')
        cursor = connection.cursor()

        query = f"INSERT INTO {cls.TABLE_NAME} VALUES(?, ?)".format(table=cls.TABLE_NAME)
        cursor.execute(query, (item['name'], item['price']))

        connection.commit()
        connection.close()

    @classmethod
    def update(cls, item):
        connection = sqlite3.connect('data.db')
        cursor = connection.cursor()

        query = f"UPDATE {cls.TABLE_NAME} SET price=? WHERE name=?"
        cursor.execute(query, (item['price'], item['name']))

        connection.commit()
        connection.close()

    # @jwt_required()
    def get(self, name):
        item = self.find_by_name(name)

        if item:
            return item
        return {'message': 'Item not found'},404

    @jwt_required()
    def post(self, name):
        # if next(filter(lambda x: x["name"] == name, items), None) is not None:
        if self.find_by_name(name):
            return {"message": f"an item with name {name} already exists."}, 400 # 400: request problem
        
        data = Item.parser.parse_args()

        item = {"name": name, "price": data["price"]}

        try:
            Item.insert(item)
        except:
            return {"message": "An error occured inserting the item."}, 500 # 500: server problem 

        return item, 201
        
    # @jwt_required()
    def delete(self, name):
        connection = sqlite3.connect('data.db')
        cursor = connection.cursor()

        query = f"DELETE FROM {cls.TABLE_NAME} WHERE name=?"
        cursor.execute(query, (name,))

        connection.commit()
        connection.close()
        return {"message": "Item deleted"}

    # @jwt_required()
    def put(self, name):
        # data = request.get_json()
        data = Item.parser.parse_args()
        # item = next(filter(lambda x: x["name"] != name, items), None)
        item = self.find_by_name(name)
        updated_item = {'name': name, 'price': data['price']}
        if item is None:
            try:
                self.insert(updated_item)
            except:
                return {"message": "An error occured inserting the item."}, 500
        else:
            try:
                self.update(updated_item)
            except:
                return {"message": "An error occured inserting the item."}, 500
        return updated_item


class ItemList(Resource):
    TABLE_NAME = 'items'

    def get(self):
        connection = sqlite3.connect('data.db')
        cursor = connection.cursor()

        query = f"SELECT * FROM {self.TABLE_NAME}"
        result = cursor.execute(query)
        items = []
        for row in result:
            items.append({'name': row[0], 'price': row[1]})
        connection.close()

        return {'items': items}

