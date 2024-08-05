export const setCookie = (tokenName) => {
    document.cookie = ''
    const cookieName = 'roti';
    const token = tokenName;
    const expirationHours = 3;
  
    const expirationDate = new Date();
    expirationDate.setTime(expirationDate.getTime() + expirationHours * 60 * 60 * 1000);
    
    document.cookie = `${cookieName}=${token}; expires=${expirationDate.toUTCString()}; path=/`;
};
  
export const getTokenCookie = () => {

    const cookieName = 'roti';
    const cookies = document.cookie.split(';');
  
    for (const cookie of cookies) {
      const trimmedCookie = cookie.trim();
      const [name, value] = trimmedCookie.split('=');
  
      if (name === cookieName) {
        console.log(`${value}`);
        return value;
      }
    }

    return null;
};
  

export const logout = async () => {
    const cookieName = 'roti';
  
    const expirationDate = new Date(0);
  
    document.cookie = `${cookieName}=; expires=${expirationDate.toUTCString()}; path=/`;
  
    console.log('Logout successful');
};