import { serviceCartDB } from '../test.js';
import { serviceRegisterUsers } from '../test.js';
import { sendSms } from '../config/notifications/twilio.notifications.js';
import { sendEmail } from '../config/notifications/nodemailer.notifications.js';
import { sendWthsp } from '../config/notifications/twilioWthsp.notifications.js';

const postOrder = async (req, res) => {
  const { cartId, username } = req.body;

  try {
    const response = await serviceCartDB.getById(cartId);
    const { product } = response;
    if (product.length <= 0) {
      res
        .status(200)
        .json({ message: "You don't have products within the cart, please try again" });
    } else {
      const user = await serviceRegisterUsers.getUserByUsername(username);
      if (user) {
        await sendSms();
        const emailData = {
          user: user.username,
          email: user.email,
          products: product,
        };
        const responseFromNodemailer = await sendEmail(emailData);
        const responseFromWthsp = await sendWthsp({ user: user.username, email: user.email });
        if (
          responseFromNodemailer.rejected.length === 0 ||
          responseFromWthsp.errorMessage === null
        ) {
          res.status(200).json({ message: 'Purchase complete, thank you!' });
        }
      } else {
        res.status(400).json({ message: "The user don't exist. Please try again." });
      }
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { postOrder };
