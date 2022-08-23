__all__ = ["app_index", "all_exception_handler", "api_not_found"]

import logging
import os
from flask import Flask, jsonify
from flask_cors import CORS, cross_origin
from flask_restful import Api

from init_urls import initialize_api_routes
from repository.db import db
from utils.db_utils import create_connection_sql
from utils.utils import make_json_response

app = Flask(__name__)
logging.basicConfig(level=logging.DEBUG)

"""setting CORS"""
CORS(app, resources={r"/*": {"origins": "*"}})
app.config["CORS_HEADERS"] = "Content-Type"


app.config.from_pyfile("config" + os.path.sep + "config.py")
db.init_app(app)

with app.app_context():
    create_connection_sql()

api = Api(app)


@app.route("/health-check", methods=["GET"])
@cross_origin()
def app_index():
    return jsonify({"data": "I am alive. Thank you.."})


@app.errorhandler(Exception)
def all_exception_handler(err: str):
    """
    Exception handler method

    - Common exception handler to handle exceptions and raise the error.

    Parameter
    ----------
        error: str
            error details

    """
    error_message: str = getattr(err, "message", str(err))
    if app.config["DEBUG"]:
        return make_json_response({"error": str(error_message)}, 500)

    return make_json_response(
        {"error": "Something went wrong. Please try again later"}, 500
    )


@app.errorhandler(404)
def api_not_found(error: str):
    """
    API not found method

    - Check the API url and raise an exception if the matching URL not found.

    Parameter
    ----------
        error: str
            error details

    """
    return make_json_response(f"{'error: API does not exist. => ' + str(error)}", 404)


# - To intialize all API routes
initialize_api_routes(api)

if __name__ == "__main__":
    app.run()
