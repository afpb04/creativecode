import { hash } from 'bcryptjs';
import { v4 as uuid } from 'uuid';

import createConnection from '../index';

async function create() {
  const connection = await createConnection('localhost');

  const id = uuid();
  const password = await hash('admin', 8);

  await connection.query(
    `INSERT INTO USERS(id, name, phone, email, age, weight, gender ,password, "isAdmin", created_at, updated_at)
    values('${id}', 'admin', '00000000000','admin@creative.com.br', 30, 70, 'branco', '${password}', true, 'now()', 'now()' )
    `,
  );
  await connection.close();
}

create().then(() => console.log('User admin Created!'));
