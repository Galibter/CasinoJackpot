import sequelize from './sequelizeConfig'; 

// Delete stale session from db if the session last update was 1 hour ago and cashout didn't occured.
export const createDeleteStaleSessionsEvent = async () => {
  try {

    const createEventQuery = `
      CREATE EVENT IF NOT EXISTS delete_stale_sessions_event
      ON SCHEDULE EVERY 1 HOUR
      DO
      DELETE FROM session
      WHERE updatedAt < NOW() - INTERVAL 1 HOUR;
    `;

    await sequelize.query(createEventQuery);
    console.log('MySQL event created successfully.');
  } catch (error) {
    console.error('Error creating MySQL event:', error);
  }
};

createDeleteStaleSessionsEvent();
