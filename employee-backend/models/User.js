import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new Schema({
  employeeName: { type: String, required: true },
  category: { type: String, required: true },
  dateOfJoining: { type: Date, required: true },  
  experienceLevel: { type: String, required: true },
  salary: { type: Number, required: true },
  performanceReview: { type: String, required: true },
  password: { type: String, required: true }  
  
});


userSchema.pre("signup", async function (next) {
  if (!this.isModified("password")) return next(); 

  try {
    
    const hashedPassword = await bcrypt.hash(this.password, 10); 
    this.password = hashedPassword;  
    next();
  } catch (error) {
    next(error);
  }
});


const User = model("User", userSchema);

export default User;