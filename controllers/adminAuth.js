import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Admin from '../models/Admin.js';
export async function adminLogin(req,res){
  const { username, password } = req.body;
  if(!username || !password) return res.status(400).json({message:'Missing fields'});
  const admin = await Admin.findOne({ username });
  if(!admin) return res.status(401).json({message:'Invalid credentials'});
  const ok = await bcrypt.compare(password, admin.passwordHash);
  if(!ok) return res.status(401).json({message:'Invalid credentials'});
  const token = jwt.sign({ sub: admin._id, username, role: 'admin' }, process.env.JWT_SECRET || 'devsecret', { expiresIn: '8h' });
  res.json({ token, username });
}
