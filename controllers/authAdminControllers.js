const { Admin } = require("../models");
const { adminSchema, loginSchema } = require("../helper/validateAtribute");
const { hashPassword, comparePassword } = require("../utlis/bcrypt");
const { generateToken } = require("../utlis/jwt");


exports.createAdmin = async (req, res) => {
    try{
        const { name, email, password} = req.body

        const { error } = adminSchema.validate({ name, email, password})

        if(error){
            return res.status(400).json({ message: error.details[0].message });
        }

        const existingAdmin = await Admin.findOne({ where: { email } });

        if (existingAdmin) {
            return res.status(400).json({ message: 'Email sudah digunakan' });
        }

        const hashedPassword = await hashPassword(password);

        const newAdmin = await Admin.create({
            name,
            email,
            password: hashedPassword,
        });

        res.status(201).json({ message: 'Admin berhasil dibuat', data: newAdmin });
    }catch(error){
        console.log(error)
        res.status(500).json({ message: 'Internal server error' });
    }
}

exports.loginAdmin = async (req, res) => {
    try{
        const { email, password } = req.body;

        const { error } = loginSchema.validate({ email, password})

        if(error){
            return res.status(400).json({ message: error.details[0].message });
        }

        const admin = await Admin.findOne({where: { email }});
        if(!admin){
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const validPassword = await comparePassword(password, admin.password);

        if (!validPassword) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const token = generateToken({ id: admin.id, role: admin.role })

        res.json({ message: 'Login successful', token });
    }catch(error){
        console.log(error)
        res.status(500).json({ message: 'Internal server error' });
    }
}