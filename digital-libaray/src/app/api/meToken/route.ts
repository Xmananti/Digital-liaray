import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export function GET(req: NextRequest) {
  const token = req.cookies.get("token")?.value || "";
  const decryptToken: any = jwt.verify(token, process.env.TOKEN!);

  return NextResponse.json({
    userId: decryptToken.userId,
    name: decryptToken.name,
    roleId: decryptToken.roleId,
    isLogin: decryptToken.isLogin,
  });
}

// userId,
// name: username,
// password,
// roleId,
// isLogin
