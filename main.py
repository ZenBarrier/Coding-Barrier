#import os
import contact
import webapp2

#class MainPage(webapp2.RequestHandler):
#    def get(self):
#        path = os.path.join(os.path.dirname(__file__), 'index.html') 
#        f = open(path, "r")
#        self.response.write(f.read())
#        f.close()

class ProjectRedirect(webapp2.RequestHandler):
    def get(self, proj):
        self.redirect(project_links(proj))

app = webapp2.WSGIApplication([
                              (r'/projects/(.*)', ProjectRedirect),
                              (r'/mail/', contact.SendEmail),
                              #(r'/.*', MainPage),
                              ], debug=True)

def project_links(project):
    return {
        "faceblr": "https://chrome.google.com/webstore/detail/faceblr/jblofdhkclkhbcajdmfhklcgolfofbck",
        "wearfull": "https://play.google.com/store/apps/details?id=com.zenbarrier.wearfull",
        "betonblack": "https://play.google.com/store/apps/details?id=com.zenbarrier.betonblack",
        "zenweather": "https://play.google.com/store/apps/details?id=com.zenbarrier.zenweather",
        "zencompass": "https://play.google.com/store/apps/details?id=com.zenbarrier.zencompass",
    }.get(project, "/projects")