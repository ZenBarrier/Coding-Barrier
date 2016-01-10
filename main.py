import webapp2
import os

class MainPage(webapp2.RequestHandler):
    def get(self):
        path = os.path.join(os.path.dirname(__file__), 'index.html') 
        f=open(path, "r")
        self.response.write(f.read())
        f.close();

app = webapp2.WSGIApplication([
    (r'/.*', MainPage),
], debug=True)