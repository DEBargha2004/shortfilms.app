import Pocketbase from "pocketbase";

const pb = new Pocketbase(process.env.NEXT_PUBLIC_POCKETBASE_URL);

const pbAdmin = await (async () => {
  const pb = new Pocketbase(process.env.NEXT_PUBLIC_POCKETBASE_URL);
  pb.autoCancellation(false);

  await pb.admins.authWithPassword(
    process.env.POCKETBASE_EMAIL!,
    process.env.POCKETBASE_PASSWORD!,
    {
      autoRefreshThreshold: 30 * 60,
    },
  );

  return pb;
})();

export { pbAdmin };
