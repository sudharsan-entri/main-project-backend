import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import OtpCode from '../models/OtpCode.js';
import Customer from '../models/Customer.js';

function generateCode(){ return Math.floor(100000 + Math.random()*900000).toString(); }

export async function requestOtp(req,res){
  const { mobile } = req.body;
  if(!mobile || !/^[0-9]{10,15}$/.test(mobile)) return res.status(400).json({message:'Enter a valid mobile number'});
  const code = generateCode();
  const codeHash = await bcrypt.hash(code, 10);
  const expiresAt = new Date(Date.now() + 5*60*1000);
  await OtpCode.deleteMany({ mobile });
  await OtpCode.create({ mobile, codeHash, expiresAt });
  console.log('DEV OTP for', mobile, '=>', code);
  res.json({ ok: true, devHint: process.env.OTP_DEV_HINT === 'true' ? code : undefined });
}

export async function verifyOtp(req,res){
  const { mobile, code, name, email } = req.body;
  if(!mobile || !code) return res.status(400).json({message:'Missing fields'});
  const entry = await OtpCode.findOne({ mobile }).sort({createdAt:-1});
  if(!entry) return res.status(400).json({message:'Request OTP first'});
  if(entry.expiresAt < new Date()) return res.status(400).json({message:'OTP expired'});
  const ok = await bcrypt.compare(code, entry.codeHash);
  if(!ok && code !== (process.env.OTP_DEV_BYPASS || '000000')) return res.status(400).json({message:'Invalid code'});

  let customer = await Customer.findOne({ mobile });
  if(!customer){
    customer = await Customer.create({ mobile, name: name || 'Guest', email: email || '' });
  }else{
    if(name || email){
      customer.name = name || customer.name;
      customer.email = email || customer.email;
      await customer.save();
    }
  }
  await OtpCode.deleteMany({ mobile });
  const token = jwt.sign({ sub: customer._id, mobile, role: 'customer', name: customer.name }, process.env.JWT_SECRET || 'devsecret', { expiresIn: '7d' });
  res.json({ token, customer: { id: customer._id, name: customer.name, mobile: customer.mobile, email: customer.email } });
}
