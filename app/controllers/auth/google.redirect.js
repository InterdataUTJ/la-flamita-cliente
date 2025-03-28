import { google } from 'googleapis';

export default async function googleRedirect(req, res, next) {
  const redirectTo = process.env.NODE_ENV === 'production' 
    ? `${process.env.APP_URL}/login/google`
    : `http://localhost:5173/login/google`;

  try {
    const oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      redirectTo
    );
    
    const authorizationUrl = oauth2Client.generateAuthUrl({
      // 'online' (default) or 'offline' (gets refresh_token)
      access_type: 'offline',
      scope: [
        'https://www.googleapis.com/auth/userinfo.profile',
        'https://www.googleapis.com/auth/userinfo.email'
      ],
      // Enable incremental authorization. Recommended as a best practice.
      include_granted_scopes: true,
      // Include the state parameter to reduce the risk of CSRF attacks.
    });
  
    res.redirect(authorizationUrl);
  } catch (error) {
    res.redirect(redirectTo);
  }
};