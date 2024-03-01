import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('StreamHub.db');

const createTables = () => {
  return new Promise((resolve, reject) => {
    db.transaction(
      tx => {
        // Create the users table
        tx.executeSql(
          'CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT, email TEXT, bio TEXT, profileImage TEXT, followers TEXT, following TEXT)',
          [],
          () => {
            resolve();
          },
          (_, error) => {
            reject(error);
          }
        );

        // Create the user_credentials table
        tx.executeSql(
          'CREATE TABLE IF NOT EXISTS user_credentials (authToken TEXT, userId TEXT)',
          [],
          () => {
            resolve();
          },
          (_, error) => {
            reject(error);
          }
        );

        // Add more statements for other tables if needed
      },
      error => {
        reject(error);
      }
    );
  });
};

const storeUserData = (user) => {
  return new Promise((resolve, reject) => {
    createTables()
      .then(() => {
        db.transaction(
          tx => {
            tx.executeSql(
              'INSERT OR REPLACE INTO users (id, username, email, bio, profileImage, followers, following) VALUES (?, ?, ?, ?, ?, ?, ?)',
              [
                user.id,
                user.username,
                user.email,
                user.bio,
                user.profileImage,
                JSON.stringify(user.followers),
                JSON.stringify(user.following),
              ],
              (_, results) => {
                resolve(results);
              },
              (_, error) => {
                reject(error);
              }
            );
          },
          error => reject(error)
        );
      })
      .catch(error => reject(error));
  });
};

const fetchUserData = () => {
  return new Promise((resolve, reject) => {
    db.transaction(
      tx => {
        tx.executeSql(
          'SELECT * FROM users',
          [],
          (_, results) => {
            if (results.rows.length > 0) {
              const userData = results.rows.item(0);
              userData.followers = JSON.parse(userData.followers);
              userData.following = JSON.parse(userData.following);
              resolve(userData);
            } else {
              resolve(null);
            }
          },
          (_, error) => {
            reject(error);
          }
        );
      },
      error => reject(error)
    );
  });
};

const storeUserCredentials = (authToken, userId) => {
  return new Promise((resolve, reject) => {
    db.transaction(
      tx => {
        tx.executeSql(
          'INSERT OR REPLACE INTO user_credentials (authToken, userId) VALUES (?, ?);',
          [authToken, userId],
          (_, results) => {
            resolve(results);
          },
          (_, error) => {
            reject(error);
          }
        );
      },
      error => reject(error)
    );
  });
};

const fetchUserCredentials = () => {
  return new Promise((resolve, reject) => {
    db.transaction(
      tx => {
        tx.executeSql(
          'SELECT * FROM user_credentials',
          [],
          (_, results) => {
            if (results.rows.length > 0) {
              const credentials = results.rows.item(0);
              resolve(credentials);
            } else {
              resolve(null);
            }
          },
          (_, error) => {
            reject(error);
          }
        );
      },
      error => reject(error)
    );
  });
};

const clearDatabase = () => {
  return new Promise((resolve, reject) => {
    db.transaction(
      tx => {
        tx.executeSql('DELETE FROM users;', [], (_, results) => {
          console.log('All data deleted from the users table.');
        });
        tx.executeSql('DELETE FROM user_credentials;', [], (_, results) => {
          console.log('All data deleted from the user_credentials table.');
        });
        // Add more statements for other tables if needed
      },
      error => {
        reject(error);
      },
      () => {
        resolve();
      }
    );
  });
};

export {
  createTables,
  storeUserData,
  fetchUserData,
  storeUserCredentials,
  fetchUserCredentials,
  clearDatabase,
};
