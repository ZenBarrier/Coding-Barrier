import webapp2
import os

class MainPage(webapp2.RequestHandler):
    def get(self):
        path = os.path.join(os.path.dirname(__file__), 'index.html') 
        f=open(path, "r")
        self.response.write(f.read())
        f.close()

class ProjectRedirect(webapp2.RequestHandler):
    def get(self, proj):
        self.redirect(projectLinks(proj))

app = webapp2.WSGIApplication([
    (r'/projects/(.*)', ProjectRedirect),
    (r'/.*', MainPage),
], debug=True)

def projectLinks(project):
    return {
        "faceblr": "https://chrome.google.com/webstore/detail/faceblr/jblofdhkclkhbcajdmfhklcgolfofbck",
        "wearfull": "https://play.google.com/store/apps/details?id=com.zenbarrier.wearfull",
    }.get(project,"/projects")