# CLAUDE.md — digitalcrew-template

## Le dépôt
- Gabarit d'application Next.js 16 (App Router, `--webpack` en dev) + React 19, TypeScript, Tailwind CSS 4, shadcn/ui (style radix-nova, icônes Lucide), next-intl, next-themes.
- Auth : Better Auth (email/mot de passe + plugin organization) via `lib/auth.ts`, route `app/api/auth/[...all]`.
- Base : PostgreSQL via Drizzle ORM (`db/`), migrations SQL dans `drizzle/`.
- Gestionnaire de paquets : npm (`package-lock.json`). Aucune version de Node fixée (pas de `.nvmrc` ni de champ `engines`).
- Variables attendues (voir `.env.example`, valeurs factices uniquement) : `DATABASE_URL`, `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL`.
  `db/index.ts` lève une erreur à l'import si `DATABASE_URL` est absent.

## Commandes (package.json)
- Installation : `npm ci` (ne touche pas `package-lock.json`) ; `npm install <paquet>` seulement pour ajouter une dépendance.
- Dev : `npm run dev` · Build : `npm run build` · Prod locale : `npm run start`
- Lint : `npm run lint` · Typecheck : `npm run typecheck` (`tsc --noEmit`). Les deux passent sur `main` (vérifié avec Node 24, npm 11).
- Format : `npm run format` (Prettier sur `**/*.{ts,tsx}`, tri des classes Tailwind)
- Pas de script de test, aucun framework de test installé, pas de CI (`.github/` absent).
- Drizzle : `npm run db:generate` (crée une migration depuis `db/schema.ts`). `db:migrate`, `db:push`, `db:studio` touchent une base : ne pas les lancer sans accord humain.
- `npm run auth:generate-schema` réécrit entièrement `db/schema.ts` depuis la config Better Auth.
- Composants shadcn : `npx shadcn@latest add <composant>` (installés dans `components/ui`).

## Structure
- `app/[locale]/(public)/` : login, sign-up · `app/[locale]/(dashboard)/` : dashboard, settings, support.
- `app/api/auth/[...all]/route.ts` : handler Better Auth.
- `features/` : modules métier (auth, landing, settings, support) appelés par les pages de `app/`.
- `components/ui/` : shadcn (généré) · `components/layout/` : sidebar, header, navigation (`data/sidebar-data.ts`).
- `context/` : providers client (thème, recherche, splash cursor) · `hooks/` : hooks partagés.
- `lib/` : `auth.ts`, `auth-client.ts`, `utils.ts`, `i18n/` (routing, navigation, pathname).
- `db/` : `schema.ts` (tables Better Auth) et `index.ts` (pool `pg` + client Drizzle).
- `messages/` : traductions next-intl, une par locale.
- `middleware.ts` : next-intl + redirection vers `/<locale>/login` sans cookie de session.
- Alias d'import : `@/*` pointe vers la racine.

## Règles
- Migrations : ne jamais modifier une migration déjà présente dans `drizzle/` ; ne pas éditer `drizzle/meta/` à la main (`db:generate` le met à jour). Changer `db/schema.ts`, puis `npm run db:generate` pour une nouvelle migration. Migrations additives (expand/contract) : ajouter avant de supprimer ou renommer.
- i18n : 4 locales (`en`, `fr`, `es`, `zh`). Toute clé ajoutée ou modifiée l'est dans les 4 fichiers `messages/*.json`, qui ont aujourd'hui les mêmes clés.
- Ajouter une locale demande de toucher `lib/i18n/routing.ts`, `messages/<locale>.json` ET la regex en dur du `matcher` de `middleware.ts`.
- Nouvelle route protégée : la placer sous `app/[locale]/(dashboard)/`, dont le layout vérifie la session côté serveur (`auth.api.getSession`) : c'est le vrai contrôle d'accès. L'ajouter aussi à la regex `protectedPath` de `middleware.ts`, qui ne fait qu'une redirection rapide vers le login en testant la présence du cookie de session (`getSessionCookie`, sans le valider) : ce n'est pas un contrôle d'accès.
- Liens internes : utiliser les helpers de `lib/i18n/navigation.ts` (préfixe de locale obligatoire, `localePrefix: "always"`).
- Secrets : jamais dans le code ; `.env.example` ne contient que des noms et des valeurs factices. Pas d'hôte de prod en dur (l'URL publique vient de `BETTER_AUTH_URL`).
- Style : Prettier (`.prettierrc` : sans point-virgule, guillemets doubles, largeur 80). Lancer `npm run format` sur les fichiers modifiés.
- Pas de tests aujourd'hui : si un framework de test est ajouté, adapter les tests à chaque changement.

## Flux Git
- Branche par défaut : `main` (une branche `develop` existe aussi).
- Branche de travail : `claude/<clé-de-la-carte>-<mot-clé>`.
- PR vers `main`, relecture humaine obligatoire. Jamais de push sur `main` ou `develop`, jamais de merge, jamais de force-push.
- Avant de pousser : `npm run lint` et `npm run typecheck`. `npm run build` (si routes, middleware ou config touchés) importe `lib/auth.ts` → `db/index.ts`, qui lève une erreur à l'import sans `DATABASE_URL` : fournir une valeur factice.
