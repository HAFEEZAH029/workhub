-- ==========================================================
-- FILE: database/03-workspace-images.sql
-- PURPOSE:
-- Seed workspace_images table with image paths for every
-- workspace in the application.
--
-- Each workspace has:
--   • 1 Primary Image
--   • 1 Support Image
--
-- Images are stored locally under:
-- /public/images/workspaces/
--
-- NOTE:
-- workspace_id is resolved dynamically using the workspace slug,
-- so UUIDs never need to be hardcoded.
-- ==========================================================



-- ==========================================================
-- PHONE BOOTHS
-- ==========================================================

-- Echo
INSERT INTO workspace_images
(workspace_id, image_path, display_order, is_primary, alt_text)
SELECT
id,
'/images/workspaces/phone-booths/echo/echo-primary.png',
1,
true,
'Echo phone booth primary view'
FROM workspaces
WHERE slug='echo';

INSERT INTO workspace_images
(workspace_id, image_path, display_order, is_primary, alt_text)
SELECT
id,
'/images/workspaces/phone-booths/echo/echo-support.png',
2,
false,
'Echo phone booth secondary view'
FROM workspaces
WHERE slug='echo';


-- Clarity
INSERT INTO workspace_images
(workspace_id, image_path, display_order, is_primary, alt_text)
SELECT
id,
'/images/workspaces/phone-booths/clarity/clarity-primary.png',
1,
true,
'Clarity phone booth primary view'
FROM workspaces
WHERE slug='clarity';

INSERT INTO workspace_images
(workspace_id, image_path, display_order, is_primary, alt_text)
SELECT
id,
'/images/workspaces/phone-booths/clarity/clarity-support.png',
2,
false,
'Clarity phone booth secondary view'
FROM workspaces
WHERE slug='clarity';


-- Solace
INSERT INTO workspace_images
(workspace_id, image_path, display_order, is_primary, alt_text)
SELECT
id,
'/images/workspaces/phone-booths/solace/solace-primary.png',
1,
true,
'Solace phone booth primary view'
FROM workspaces
WHERE slug='solace';

INSERT INTO workspace_images
(workspace_id, image_path, display_order, is_primary, alt_text)
SELECT
id,
'/images/workspaces/phone-booths/solace/solace-support.png',
2,
false,
'Solace phone booth secondary view'
FROM workspaces
WHERE slug='solace';


-- Whisper
INSERT INTO workspace_images
(workspace_id, image_path, display_order, is_primary, alt_text)
SELECT
id,
'/images/workspaces/phone-booths/whisper/whisper-primary.png',
1,
true,
'Whisper phone booth primary view'
FROM workspaces
WHERE slug='whisper';

INSERT INTO workspace_images
(workspace_id, image_path, display_order, is_primary, alt_text)
SELECT
id,
'/images/workspaces/phone-booths/whisper/whisper-support.png',
2,
false,
'Whisper phone booth secondary view'
FROM workspaces
WHERE slug='whisper';



-- ==========================================================
-- MEETING ROOMS
-- ==========================================================

-- Board Room
INSERT INTO workspace_images
(workspace_id, image_path, display_order, is_primary, alt_text)
SELECT
id,
'/images/workspaces/meeting-rooms/board-room/board-room-primary.jpg',
1,
true,
'Board Room primary view'
FROM workspaces
WHERE slug='board-room';

INSERT INTO workspace_images
(workspace_id, image_path, display_order, is_primary, alt_text)
SELECT
id,
'/images/workspaces/meeting-rooms/board-room/board-room-support.png',
2,
false,
'Board Room secondary view'
FROM workspaces
WHERE slug='board-room';


-- Creative Room
INSERT INTO workspace_images
(workspace_id, image_path, display_order, is_primary, alt_text)
SELECT
id,
'/images/workspaces/meeting-rooms/creative-room/creative-room-primary.png',
1,
true,
'Creative Room primary view'
FROM workspaces
WHERE slug='creative-room';

INSERT INTO workspace_images
(workspace_id, image_path, display_order, is_primary, alt_text)
SELECT
id,
'/images/workspaces/meeting-rooms/creative-room/creative-room-support.png',
2,
false,
'Creative Room secondary view'
FROM workspaces
WHERE slug='creative-room';


-- Huddle Room
INSERT INTO workspace_images
(workspace_id, image_path, display_order, is_primary, alt_text)
SELECT
id,
'/images/workspaces/meeting-rooms/huddle-room/huddle-room-primary.jpg',
1,
true,
'Huddle Room primary view'
FROM workspaces
WHERE slug='huddle-room';

INSERT INTO workspace_images
(workspace_id, image_path, display_order, is_primary, alt_text)
SELECT
id,
'/images/workspaces/meeting-rooms/huddle-room/huddle-room-support.jpg',
2,
false,
'Huddle Room secondary view'
FROM workspaces
WHERE slug='huddle-room';

-- ============================================================
-- PRIVATE OFFICES - EXECUTIVE
-- ============================================================

insert into public.workspace_images
(workspace_id, image_path, display_order, is_primary, alt_text)
select
    w.id,
    '/images/workspaces/executive/apex/apex-primary.png',
    1,
    true,
    'Primary image of Apex Executive Office'
from public.workspaces w
where w.slug = 'apex';

insert into public.workspace_images
(workspace_id, image_path, display_order, is_primary, alt_text)
select
    w.id,
    '/images/workspaces/executive/apex/apex-support.png',
    2,
    false,
    'Secondary image of Apex Executive Office'
from public.workspaces w
where w.slug = 'apex';


insert into public.workspace_images
(workspace_id, image_path, display_order, is_primary, alt_text)
select
    w.id,
    '/images/workspaces/executive/summit/summit-primary.png',
    1,
    true,
    'Primary image of Summit Executive Office'
from public.workspaces w
where w.slug = 'summit';

insert into public.workspace_images
(workspace_id, image_path, display_order, is_primary, alt_text)
select
    w.id,
    '/images/workspaces/executive/summit/summit-support.png',
    2,
    false,
    'Secondary image of Summit Executive Office'
from public.workspaces w
where w.slug = 'summit';


insert into public.workspace_images
(workspace_id, image_path, display_order, is_primary, alt_text)
select
    w.id,
    '/images/workspaces/executive/zenith/zenith-primary.png',
    1,
    true,
    'Primary image of Zenith Executive Office'
from public.workspaces w
where w.slug = 'zenith';

insert into public.workspace_images
(workspace_id, image_path, display_order, is_primary, alt_text)
select
    w.id,
    '/images/workspaces/executive/zenith/zenith-support.png',
    2,
    false,
    'Secondary image of Zenith Executive Office'
from public.workspaces w
where w.slug = 'zenith';


-- ============================================================
-- PRIVATE OFFICES - DELUXE
-- ============================================================

insert into public.workspace_images
(workspace_id, image_path, display_order, is_primary, alt_text)
select
    w.id,
    '/images/workspaces/deluxe/cosmos/cosmos-primary.png',
    1,
    true,
    'Primary image of Cosmos Deluxe Office'
from public.workspaces w
where w.slug = 'cosmos';

insert into public.workspace_images
(workspace_id, image_path, display_order, is_primary, alt_text)
select
    w.id,
    '/images/workspaces/deluxe/cosmos/cosmos-support.png',
    2,
    false,
    'Secondary image of Cosmos Deluxe Office'
from public.workspaces w
where w.slug = 'cosmos';


insert into public.workspace_images
(workspace_id, image_path, display_order, is_primary, alt_text)
select
    w.id,
    '/images/workspaces/deluxe/horizon/horizon-primary.png',
    1,
    true,
    'Primary image of Horizon Deluxe Office'
from public.workspaces w
where w.slug = 'horizon';

insert into public.workspace_images
(workspace_id, image_path, display_order, is_primary, alt_text)
select
    w.id,
    '/images/workspaces/deluxe/horizon/horizon-support.png',
    2,
    false,
    'Secondary image of Horizon Deluxe Office'
from public.workspaces w
where w.slug = 'horizon';


insert into public.workspace_images
(workspace_id, image_path, display_order, is_primary, alt_text)
select
    w.id,
    '/images/workspaces/deluxe/nebula/nebula-primary.png',
    1,
    true,
    'Primary image of Nebula Deluxe Office'
from public.workspaces w
where w.slug = 'nebula';

insert into public.workspace_images
(workspace_id, image_path, display_order, is_primary, alt_text)
select
    w.id,
    '/images/workspaces/deluxe/nebula/nebula-support.png',
    2,
    false,
    'Secondary image of Nebula Deluxe Office'
from public.workspaces w
where w.slug = 'nebula';


insert into public.workspace_images
(workspace_id, image_path, display_order, is_primary, alt_text)
select
    w.id,
    '/images/workspaces/deluxe/stratos/stratos-primary.png',
    1,
    true,
    'Primary image of Stratos Deluxe Office'
from public.workspaces w
where w.slug = 'stratos';

insert into public.workspace_images
(workspace_id, image_path, display_order, is_primary, alt_text)
select
    w.id,
    '/images/workspaces/deluxe/stratos/stratos-support.png',
    2,
    false,
    'Secondary image of Stratos Deluxe Office'
from public.workspaces w
where w.slug = 'stratos';




-- ============================================================
-- HOT DESKS - SOLO
-- ============================================================

insert into public.workspace_images
(workspace_id, image_path, display_order, is_primary, alt_text)
select
    w.id,
    '/images/workspaces/hot-desks/solo/clover/clover-primary.png',
    1,
    true,
    'Primary image of Clover hot desk'
from public.workspaces w
where w.slug = 'clover';

insert into public.workspace_images
(workspace_id, image_path, display_order, is_primary, alt_text)
select
    w.id,
    '/images/workspaces/hot-desks/solo/clover/clover-support.png',
    2,
    false,
    'Secondary image of Clover hot desk'
from public.workspaces w
where w.slug = 'clover';


insert into public.workspace_images
(workspace_id, image_path, display_order, is_primary, alt_text)
select
    w.id,
    '/images/workspaces/hot-desks/solo/drift/drift-primary.png',
    1,
    true,
    'Primary image of Drift hot desk'
from public.workspaces w
where w.slug = 'drift';

insert into public.workspace_images
(workspace_id, image_path, display_order, is_primary, alt_text)
select
    w.id,
    '/images/workspaces/hot-desks/solo/drift/drift-support.png',
    2,
    false,
    'Secondary image of Drift hot desk'
from public.workspaces w
where w.slug = 'drift';


insert into public.workspace_images
(workspace_id, image_path, display_order, is_primary, alt_text)
select
    w.id,
    '/images/workspaces/hot-desks/solo/ember/ember-primary.png',
    1,
    true,
    'Primary image of Ember hot desk'
from public.workspaces w
where w.slug = 'ember';

insert into public.workspace_images
(workspace_id, image_path, display_order, is_primary, alt_text)
select
    w.id,
    '/images/workspaces/hot-desks/solo/ember/ember-support.png',
    2,
    false,
    'Secondary image of Ember hot desk'
from public.workspaces w
where w.slug = 'ember';


insert into public.workspace_images
(workspace_id, image_path, display_order, is_primary, alt_text)
select
    w.id,
    '/images/workspaces/hot-desks/solo/flint/flint-primary.png',
    1,
    true,
    'Primary image of Flint hot desk'
from public.workspaces w
where w.slug = 'flint';

insert into public.workspace_images
(workspace_id, image_path, display_order, is_primary, alt_text)
select
    w.id,
    '/images/workspaces/hot-desks/solo/flint/flint-support.png',
    2,
    false,
    'Secondary image of Flint hot desk'
from public.workspaces w
where w.slug = 'flint';


insert into public.workspace_images
(workspace_id, image_path, display_order, is_primary, alt_text)
select
    w.id,
    '/images/workspaces/hot-desks/solo/moss/moss-primary.png',
    1,
    true,
    'Primary image of Moss hot desk'
from public.workspaces w
where w.slug = 'moss';

insert into public.workspace_images
(workspace_id, image_path, display_order, is_primary, alt_text)
select
    w.id,
    '/images/workspaces/hot-desks/solo/moss/moss-support.png',
    2,
    false,
    'Secondary image of Moss hot desk'
from public.workspaces w
where w.slug = 'moss';


insert into public.workspace_images
(workspace_id, image_path, display_order, is_primary, alt_text)
select
    w.id,
    '/images/workspaces/hot-desks/solo/quartz/quartz-primary.png',
    1,
    true,
    'Primary image of Quartz hot desk'
from public.workspaces w
where w.slug = 'quartz';

insert into public.workspace_images
(workspace_id, image_path, display_order, is_primary, alt_text)
select
    w.id,
    '/images/workspaces/hot-desks/solo/quartz/quartz-support.png',
    2,
    false,
    'Secondary image of Quartz hot desk'
from public.workspaces w
where w.slug = 'quartz';





-- ============================================================
-- HOT DESKS - TEAM
-- ============================================================

insert into public.workspace_images
(workspace_id, image_path, display_order, is_primary, alt_text)
select
    w.id,
    '/images/workspaces/hot-desks/team/archipelago/archipelago-primary.png',
    1,
    true,
    'Primary image of Archipelago hot desk'
from public.workspaces w
where w.slug = 'archipelago';

insert into public.workspace_images
(workspace_id, image_path, display_order, is_primary, alt_text)
select
    w.id,
    '/images/workspaces/hot-desks/team/archipelago/archipelago-support.png',
    2,
    false,
    'Secondary image of Archipelago hot desk'
from public.workspaces w
where w.slug = 'archipelago';


insert into public.workspace_images
(workspace_id, image_path, display_order, is_primary, alt_text)
select
    w.id,
    '/images/workspaces/hot-desks/team/canyon/canyon-primary.png',
    1,
    true,
    'Primary image of Canyon hot desk'
from public.workspaces w
where w.slug = 'canyon';

insert into public.workspace_images
(workspace_id, image_path, display_order, is_primary, alt_text)
select
    w.id,
    '/images/workspaces/hot-desks/team/canyon/canyon-support.png',
    2,
    false,
    'Secondary image of Canyon hot desk'
from public.workspaces w
where w.slug = 'canyon';


insert into public.workspace_images
(workspace_id, image_path, display_order, is_primary, alt_text)
select
    w.id,
    '/images/workspaces/hot-desks/team/delta/delta-primary.png',
    1,
    true,
    'Primary image of Delta hot desk'
from public.workspaces w
where w.slug = 'delta';

insert into public.workspace_images
(workspace_id, image_path, display_order, is_primary, alt_text)
select
    w.id,
    '/images/workspaces/hot-desks/team/delta/delta-support.png',
    2,
    false,
    'Secondary image of Delta hot desk'
from public.workspaces w
where w.slug = 'delta';


insert into public.workspace_images
(workspace_id, image_path, display_order, is_primary, alt_text)
select
    w.id,
    '/images/workspaces/hot-desks/team/meadow/meadow-primary.png',
    1,
    true,
    'Primary image of Meadow hot desk'
from public.workspaces w
where w.slug = 'meadow';

insert into public.workspace_images
(workspace_id, image_path, display_order, is_primary, alt_text)
select
    w.id,
    '/images/workspaces/hot-desks/team/meadow/meadow-support.png',
    2,
    false,
    'Secondary image of Meadow hot desk'
from public.workspaces w
where w.slug = 'meadow';


insert into public.workspace_images
(workspace_id, image_path, display_order, is_primary, alt_text)
select
    w.id,
    '/images/workspaces/hot-desks/team/tundra/tundra-primary.png',
    1,
    true,
    'Primary image of Tundra hot desk'
from public.workspaces w
where w.slug = 'tundra';

insert into public.workspace_images
(workspace_id, image_path, display_order, is_primary, alt_text)
select
    w.id,
    '/images/workspaces/hot-desks/team/tundra/tundra-support.png',
    2,
    false,
    'Secondary image of Tundra hot desk'
from public.workspaces w
where w.slug = 'tundra';


insert into public.workspace_images
(workspace_id, image_path, display_order, is_primary, alt_text)
select
    w.id,
    '/images/workspaces/hot-desks/team/valley/valley-primary.png',
    1,
    true,
    'Primary image of Valley hot desk'
from public.workspaces w
where w.slug = 'valley';

insert into public.workspace_images
(workspace_id, image_path, display_order, is_primary, alt_text)
select
    w.id,
    '/images/workspaces/hot-desks/team/valley/valley-support.png',
    2,
    false,
    'Secondary image of Valley hot desk'
from public.workspaces w
where w.slug = 'valley';