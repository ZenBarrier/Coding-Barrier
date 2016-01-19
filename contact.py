from google.appengine.api import mail
import webapp2

class SendEmail(webapp2.RequestHandler):
    def post(self):
        user_name = self.request.get("name")
        user_address = self.request.get("email")
        subject = self.request.get("subject")
        body = self.request.get("message")
        behalf_of = user_name + " <" + user_address +">"

        sender_address ="CB Contact <contact@codingbarrier.appspotmail.com>"
        
        mail.send_mail(sender= sender_address,
               to = "Anthony <anthony@codingbarrier.com>",
               cc = behalf_of,
               reply_to = behalf_of,
               subject = subject+" | "+user_name+" | "+user_address,
               body = body,
               headers = {"On-Behalf-Of":behalf_of})