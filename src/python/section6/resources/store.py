from flask_restful import Resource
from models.store import StoreModel

class Store(Resource):

    def get(self, name):
        store = StoreModel.find_by_name(name)
        if store: 
            return store.json() # default 200
        return {'message': 'Store not found'}, 404
        
    def put(self, name):
        pass
    def post(self, name):
        if StoreModel.find_by_name(name):
            return {'message': f'Store with name \"{name}\" already exists'}, 400
        store = StoreModel(name)
        try: 
            store.save_to_db()
        except:
            return { 'message': 'An error occurreed while creating the store.'} , 500
        return store.json(), 201
    def delete(self, name):
        store = StoreModel.find_byname(name)
        if store:
            store.delete_from_db()
        return {'message': 'Store deleted'}
class StoreList(Resource):
    def get(self):
        return {'store': [store.json() for store in StoreModel.query.all()]}