import os

class BaseConfig(object):
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    DEBUG = True
    TESTING = False


class DevelopmentConfig(BaseConfig):
    DEBUG =  False
    # TESTING = True
    # SQLALCHEMY_DATABASE_URI = 'sqlite:///app.db'


class ProductionConfig(BaseConfig):
    DEBUG = True
    TESTING = True
    # SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL')


config = {
    "default": "main.config.BaseConfig",
    "development": "main.config.DevelopmentConfig",
    "production": "main.config.ProductionConfig"
}

def configure_app(app):
    config_name= os.getenv('FLASK_ENV')
    app.config.from_object(config['development'])
    app.config.from_pyfile('application.cfg', silent=True)