const Sequelize = require('sequelize');
const { UUID, UUIDV4, STRING } = Sequelize;
const conn = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/the_acme_reservations_db');

const common = {
  id: {
    type: UUID,
    defaultValue: UUIDV4,
    primaryKey: true
  }
};

const User = conn.define('user', {
  ...common,
  name: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  }
});
const Restaurant = conn.define('restaurant', {
  ...common,
  name: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  }
});
const Reservation = conn.define('reservation', {
  ...common,
  restaurantId: {
    type: UUID,
    allowNull: false
  },
  userId: {
    type: UUID,
    allowNull: false
  }
});

Reservation.belongsTo(User);
Reservation.belongsTo(Restaurant);

Reservation.addHook('beforeCreate', async(reservation)=> {
  const reservations = await Reservation.findAll({
    where: {
      userId: reservation.userId,
      restaurantId: reservation.restaurantId
    }
  });
  if(reservations.length === 5){
    throw 'too many';
  }
});


const seed = async()=> {
  const [moe, larry, lucy, beagle, arnolds, monks] = await Promise.all([
    User.create({ name: 'moe'}),
    User.create({ name: 'larry'}),
    User.create({ name: 'lucy'}),
    Restaurant.create({ name: 'the reagle beagle'}),
    Restaurant.create({ name: 'arnolds'}),
    Restaurant.create({ name: 'monks diner'}),
  ]);
  return Promise.all([
    Reservation.create({ userId: lucy.id, restaurantId: beagle.id}),
    Reservation.create({ userId: lucy.id, restaurantId: beagle.id})
  ]);
};

module.exports = {
  conn,
  seed,
  Restaurant,
  Reservation,
  User
};
