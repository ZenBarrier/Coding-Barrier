from google.appengine.api import mail
import json
import webapp2

class SendEmail(webapp2.RequestHandler):
    def post(self):
        to = self.request.get("to")
        user_name = self.request.get("name")
        user_address = self.request.get("email")
        subject = self.request.get("subject")
        body = self.request.get("message")
        behalf_of = user_name + " <" + user_address +">"

        sender_address ="CB Contact <contact@codingbarrier.appspotmail.com>"
        
        if "<anthony@codingbarrier.com>" not in to:
            if "<mail@anthonybarrera.com>" not in to:
                return
        
        mail.send_mail(sender= sender_address,
               to = to,
               #cc = behalf_of,
               reply_to = behalf_of,
               subject = subject+" | "+user_name+" | "+user_address,
               body = body,
               headers = {"On-Behalf-Of":behalf_of})
        self.response.out.write(json.dumps({"done":"true"}))