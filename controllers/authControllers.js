const { User, Profile } = require("../models");
const { userSchema } = require("../helper/validateAtribute");
const { hashPassword, comparePassword } = require("../utlis/bcrypt");
const { generateToken } = require("../utlis/jwt");
const sendEmail = require("../utlis/email");

exports.registerUser = async (req, res) => {
    try{
        const { email, password, firstName, lastName, address, phoneNumber} = req.body

        const { error } = userSchema.validate( { email, password, firstName, lastName, address, phoneNumber} )

        if(error){
            return res.status(400).json({ message: error.details[0].message });
        }

        const existingUser = await User.findOne({ where: { email } });

        if (existingUser) {
            return res.status(400).json({ message: 'Email sudah digunakan' });
        }

        const hashedPassword = await hashPassword(password);

        const newUser = await User.create({
            email,
            password: hashedPassword,
            profile: {
                firstName,
                lastName,
                address,
                phoneNumber
            }
        },{
            include: [{
                model: Profile,
                as: 'profile'
            }]
        });

        res.status(201).json({ message: 'User berhasil dibuat', data: newUser });
    }catch(error){
        console.log(error)
        res.status(500).json({ message: 'Internal server error' });
    }
}

exports.loginUser = async (req, res) => {
    try{
        const { email, password } = req.body;

        const user = await User.findOne({where: { email }});
        if(!user){
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const validPassword = await comparePassword(password, user.password);

        if (!validPassword) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }
        // console.log(user.id, 'test')

        const token = generateToken({ id: user.id, role: user.role })

        res.json({ message: 'Login successful', token });
    }catch(error){
        console.log(error)
        res.status(500).json({ message: 'Internal server error' });
    }
}

exports.deleteUser = async(req, res) => {
    try{
        const userId = req.user.id
        console.log(userId)
        const user = await User.findByPk(userId)

        if(!user){
            return res.status(404).json({ message: 'User Not Found'})
        }

        await user.destroy();
        res.json({ message: 'User and associated profile deleted successfully' });
    }catch(error){
        console.log(error)
        res.status(500).json({ message: 'Internal server error' });
    }
}

exports.changePasswordUser = async (req, res) => {
    try {
        const userId = req.user.id; // Asumsikan ID pengguna disimpan di req.user
        console.log(userId)
        const { oldPassword, newPassword } = req.body;

        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Verifikasi password lama
        const validPassword = await comparePassword(oldPassword, user.password);

        if (!validPassword) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const hashedPassword = await hashPassword(newPassword);

        // Atur password baru
        user.password = hashedPassword;
        await user.save();

        res.json({ message: 'Password changed successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Buat password default
        const defaultPassword = 'newPassword123'; // Ubah ini dengan logika pembuatan password yang lebih aman

        const hashedPassword = await hashPassword(defaultPassword);

        // Update password di database
        user.password = hashedPassword;
        await user.save();

        // Kirim email dengan password baru
        const templateName = 'passwordReset';
        const context = { password: defaultPassword };

        await sendEmail(email, "Password Reset", templateName, context);
        res.json({ message: "Email with new password has been sent." });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}


