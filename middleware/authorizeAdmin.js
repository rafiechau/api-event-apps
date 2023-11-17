const { Admin } = require('../models');

const authorizeAdmin = async (req, res, next) => {
    try {
      const roleId = req.user.role; // Asumsikan id admin disimpan di token
      console.log(roleId)
  
    //   console.log(admin)
      if (roleId === 1) {
        next(); // User adalah admin, lanjutkan ke route berikutnya
      } else {
        return res.status(403).json({ message: "Access denied. Admins only." });
      }

    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
};
  
module.exports = authorizeAdmin;