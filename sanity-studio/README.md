Sanity Studio (local)

Quick start:

1. From this repo, change into the studio folder:

```powershell
cd sanity-studio
npm install
```

2. Start the Studio (this may prompt you to login via the Sanity CLI):

```powershell
npx sanity start
```

Notes:
- The Studio reads `NEXT_PUBLIC_SANITY_PROJECT_ID` and `NEXT_PUBLIC_SANITY_DATASET` from the environment.
- If prompted to login, follow the CLI instructions. You can also run `npx sanity login` first.
- If you prefer the hosted Studio, use https://manage.sanity.io and open the project's Studio.
