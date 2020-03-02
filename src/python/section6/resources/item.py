# import sqlite3
from flask_restful import reqparse, Resource
from flask_jwt import jwt_required

from models.Item import ItemModel


class Item(Resource):
    TABLE_NAME = "items"

    parser = reqparse.RequestParser()
    parser.add_argument(
        "price", type=float, required=True, help="This field cannot be left blank!"
    )

    parser.add_argument(
        "store_id", type=int, required=True, help="Every item needs a store id."
    )

    # @jwt_required()
    def get(self, name):
        item = ItemModel.find_by_name(name)

        if item:
            return item.json()
        return {"message": "Item not found"}, 404

    @jwt_required()
    def post(self, name):
        # if next(filter(lambda x: x["name"] == name, items), None) is not None:
        if ItemModel.find_by_name(name):
            return (
                {"message": f"An item with name {name} already exists."},
                400,
            )  # 400: request problem

        data = Item.parser.parse_args()

        item = ItemModel(name, **data)

        try:
            item.save_to_db()
        except:
            return (
                {"message": "An error occured inserting the item."},
                500,
            )  # 500: server problem

        return item.json(), 201

    # @jwt_required()
    def delete(self, name):
        item = Item.find_by_name(name)
        if item:
            Item.delete_from_db()
        
        return {'message': 'Item deleted'}
        # connection = sqlite3.connect("data.db")
        # cursor = connection.cursor()

        # query = f"DELETE FROM {self.TABLE_NAME} WHERE name=?"
        # cursor.execute(query, (name,))

        # connection.commit()
        # connection.close()
        # return {"message": "Item deleted"}

    # @jwt_required()
    def put(self, name):
        # data = request.get_json()
        data = Item.parser.parse_args()
        # item = next(filter(lambda x: x["name"] != name, items), None)
        item = ItemModel.find_by_name(name)
        # updated_item = ItemModel(name, data["price"])
        if item is None:
            item = ItemModel(name, **data)
            # try:
            #     updated_item.insert()
            # except:
            #     return {"message": "An error occured inserting the item."}, 500
        else:
            item.price = data['price']
            item.store = data['store']
            # try:
            #     updated_item.update()
            # except:
            #     return {"message": "An error occured inserting the item."}, 500
        
        item.save_to_db()
        return item.json()


class ItemList(Resource):
    TABLE_NAME = "items"

    def get(self):
        return {'items': [item.json() for item in ItemModel.query.all()]}
        # or using lambda
        # return {'items': list(map(lambda x: x.json(), ItemModel.query.all()))}


        # connection = sqlite3.connect("data.db")
        # cursor = connection.cursor()

        # query = f"SELECT * FROM {self.TABLE_NAME}"
        # result = cursor.execute(query)
        # items = []
        # for row in result:
        #     items.append({"name": row[0], "price": row[1]})
        # connection.close()

        # return {"items": items}

