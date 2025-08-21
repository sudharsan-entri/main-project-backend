import jwt from 'jsonwebtoken';
export function requireAuth(req,res,next){
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : null;
  if(!token) return res.status(401).json({message:'Missing token'});
  try{
    req.user = jwt.verify(token, process.env.JWT_SECRET || 'devsecret');
    next();
  }catch(e){
    return res.status(401).json({message:'Invalid/expired token'});
  }
}
export function requireRole(role){
  return (req,res,next)=>{
    if(!req.user?.role || req.user.role !== role){
      return res.status(403).json({message:'Forbidden'});
    }
    next();
  }
}
