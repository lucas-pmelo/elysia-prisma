const { PrismaClient } = require('@prisma/client');

const client = new PrismaClient();

const postsToCreate = [
  {
    id: 1,
    title: 'First Post :)',
    content: 'This is the first post',
  },
  {
    id: 2,
    title: 'Second Post :)',
    content: 'This is the second post',
  },
  {
    id: 3,
    title: 'Third Post :)',
    content: 'This is the third post',
  },
  {
    id: 4,
    title: 'Fourth Post :)',
    content: 'This is the fourth post',
  },
];

const seed = async (posts) => {
  console.log('Creating posts...');

  for (let i = 0; i < posts.length; i++) {
    console.log('Creating post: ', posts[i]);
    await client.post.upsert({
      where: { id: posts[i].id },
      update: posts[i],
      create: posts[i],
    });
  }
};

seed(postsToCreate)
  .then(() => {
    console.log('Created/Updated posts successfully.');
  })
  .catch((error) => {
    console.log('Error: ', error);
  })
  .finally(() => {
    client.$disconnect();
    console.log('Disconnected Prisma Client, exiting...');
  });
