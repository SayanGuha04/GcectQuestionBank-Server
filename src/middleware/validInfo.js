export default (req, res, next) => {
    const { name, password, type } = req.body;
  
    function validNamePass(userName, userPassword) {
      return (/^(GCECTB|GCECTM)-R\d{2}-(1|2|3)\d{3}$/.test(userName) 
                && /^\d{2}\/\d{2}\/\d{4}$/.test(userPassword));
    }
  
    if (req.path === "/student") {
      if (![name, password].every(Boolean)) {
        return res.status(401).json("Missing Credentials");
      } else if (!validNamePass(name, password)) {
        return res.status(401).json("Invalid ID");
      }
    }
  
    next();
};