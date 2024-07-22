module.exports = {
    secret: process.env.JWT_SECRET || 'secret',
    options: {
      session: false,
    },
  };