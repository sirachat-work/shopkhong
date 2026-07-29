// backend/src/controllers/auth.controller.ts
import { Request, Response } from 'express';
import { registerUser, loginUser } from '../services/auth.service';

export const registerController = async (req: Request, res: Response) => {
  console.log('📥 [CONTROLLER] Received Register Request Body:', req.body);

  try {
    const { email, password, username } = req.body;

    // ✅ เติม || ระหว่างเงื่อนไข
    if (!email || !password || !username) {
      console.log('⚠️ [CONTROLLER] Missing required fields:', { 
        email: !!email, 
        password: !!password, 
        username: !!username 
      });
      return res.status(400).json({
        message: 'กรุณากรอกข้อมูล Email, Password และ Username ให้ครบถ้วน',
      });
    }

    console.log('🔄 [CONTROLLER] Calling registerUser service...');
    const newUser = await registerUser(email, password, username);

    console.log('✅ [CONTROLLER] Registration Success for user:', newUser.email);
    return res.status(201).json({
      message: 'สมัครสมาชิกสำเร็จ',
      data: newUser,
    });
  } catch (error: any) {
    // ✅ เติม || ตรง error.message || error
    console.error('❌ [CONTROLLER ERROR]:', error.message || error);
    return res.status(400).json({
      message: error.message || 'เกิดข้อผิดพลาดในการสมัครสมาชิก',
    });
  }
};

export const loginController = async (req: Request, res: Response) => {
  console.log('📥 [CONTROLLER] Received Login Request Body:', req.body);

  try {
    const { email, password } = req.body;

    // ✅ เติม || ระหว่างเงื่อนไข
    if (!email || !password) {
      return res.status(400).json({
        message: 'กรุณากรอกอีเมลและรหัสผ่าน',
      });
    }

    const result = await loginUser(email, password);
    console.log('✅ [CONTROLLER] Login Success for user:', email);
    return res.status(200).json(result);
  } catch (error: any) {
    // ✅ เติม || ตรง error.message || error
    console.error('❌ [CONTROLLER ERROR]:', error.message || error);
    return res.status(400).json({
      message: error.message || 'เกิดข้อผิดพลาดในการเข้าสู่ระบบ',
    });
  }
};