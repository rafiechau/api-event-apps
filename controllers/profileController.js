const { User, Profile } = require("../models");
const { profileSchema } = require("../helper/validateAtribute");

exports.getDataProfile = async(req, res) => {
  try{
    const userId = req.user.id;

    const userProfile = await Profile.findOne({
      where: { userId: userId },
      include: [{
          model: User,
          as: 'user', // Pastikan 'as' sesuai dengan yang didefinisikan di model
          attributes: ['email', 'role'] // Sesuaikan atribut yang ingin ditampilkan
      }]
  });
  if (!userProfile) {
    return res.status(404).json({ message: 'Profile not found' });
  }

    res.json({ profile: userProfile });
  }catch(error){
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

exports.editProfile = async (req, res) => {
    try{
    //dapat dari token
    const userId = req.user.id;
    const { firstName, lastName, address, phoneNumber } = req.body;

    const { error } = profileSchema.validate({ firstName, lastName, address, phoneNumber });
    if(error){
      return res.status(400).json({ message: error.details[0].message });
    }

    const user = await User.findByPk(userId, {
        include: [{
            model: Profile,
            as: 'profile'
        }]
    });

    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    const response = await user.profile.update({
        firstName,
        lastName,
        address,
        phoneNumber
    });

    // Kembalikan respons sukses
    res.json({ message: "Profile updated successfully", response });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}