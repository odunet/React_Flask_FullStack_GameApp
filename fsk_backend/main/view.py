#import module
from flask import Flask, url_for, render_template, redirect, request
import os
from main import app

#load environment variables into module
from dotenv import load_dotenv
load_dotenv()

#get secret key from environment
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY')

@app.route('/')
def index(): 
    return redirect(url_for('home'))

@app.route('/home')
def home():
    return render_template ("template_home.html", msg='to Home Page')

@app.route('/snake')
def snake():
    return render_template ("template_snake.html", msg='to Snake Game')

@app.route('/tictac')
def tictac():
    return render_template ("template_tictac.html", msg='to Tic Tac Toe')

@app.route('/twoDGame')
def twoDGame():
    return render_template ("template_2dGame.html", msg='to 2D Game')