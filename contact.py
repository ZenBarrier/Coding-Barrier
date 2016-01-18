from google.appengine.api import mail
import webapp2

class SendEmail(webapp2.RequestHandler):
    def post(self):
        user_address = self.request.get("email_address")

        if not mail.is_email_valid(user_address):
            # prompt user to enter a valid address
            i = 0;

        else:
            confirmation_url = createNewUserConfirmation(self.request)
            sender_address = "Contact Page <contact@codingbarrier.appspotmail.com>"
            subject = "Contact page"
            body = """
Thank you for creating an account! Please confirm your email address by
clicking on the link below:

%s
""" % confirmation_url

            mail.send_mail(sender_address, user_address, subject, body)