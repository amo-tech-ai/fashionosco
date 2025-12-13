# Supabase Schema Documentation

**Project:** `fashionos`
**Generated at:** 2025-12-13
**Total Tables:** 50

This document provides a comprehensive detailing of all tables and fields in the database.

---

## 1. Core Platform & Auth

### `profiles`
*Central user profile table*
| Column | Type | Nullable | Default |
|---|---|---|---|
| id | uuid | NO | - |
| email | text | NO | - |
| full_name | text | YES | - |
| role | USER-DEFINED | NO | 'designer'::user_role |
| avatar_url | text | YES | - |
| phone | text | YES | - |
| company_name | text | YES | - |
| created_at | timestamptz | NO | now() |
| updated_at | timestamptz | NO | now() |
| is_onboarded | boolean | YES | false |
| bio | text | YES | - |
| website | text | YES | - |
| instagram_handle | text | YES | - |
| location | text | YES | - |

### `organizations`
*Organizations that can have multiple users*
| Column | Type | Nullable | Default |
|---|---|---|---|
| id | uuid | NO | gen_random_uuid() |
| name | text | NO | - |
| type | text | NO | - |
| description | text | YES | - |
| website_url | text | YES | - |
| logo_url | text | YES | - |
| created_at | timestamptz | NO | now() |
| updated_at | timestamptz | NO | now() |
| owner_id | uuid | NO | - |

### `organizer_teams`
| Column | Type | Nullable | Default |
|---|---|---|---|
| id | uuid | NO | gen_random_uuid() |
| name | text | NO | - |
| description | text | YES | - |
| owner_id | uuid | NO | - |
| created_at | timestamptz | YES | now() |
| updated_at | timestamptz | YES | now() |
| created_by | uuid | YES | - |
| type | USER-DEFINED | YES | 'freelance_collective'::organizer_type |
| website_url | text | YES | - |
| contact_email | text | YES | - |
| contact_phone | text | YES | - |

### `organizer_team_members`
| Column | Type | Nullable | Default |
|---|---|---|---|
| id | uuid | NO | uuid_generate_v4() |
| team_id | uuid | NO | - |
| user_id | uuid | YES | - |
| stakeholder_id | uuid | YES | - |
| role_in_team | text | YES | - |
| created_at | timestamptz | NO | now() |

---

## 2. Event Management

### `events`
*Core event records*
| Column | Type | Nullable | Default |
|---|---|---|---|
| id | uuid | NO | gen_random_uuid() |
| name | text | NO | - |
| description | text | YES | - |
| start_time | timestamptz | NO | - |
| end_time | timestamptz | YES | - |
| timezone | text | YES | 'UTC' |
| capacity_limit | integer | YES | - |
| brand_color_primary | text | YES | - |
| brand_color_secondary | text | YES | - |
| ai_summary | text | YES | - |
| created_at | timestamptz | YES | now() |
| updated_at | timestamptz | YES | now() |
| created_by | uuid | YES | - |
| organizer_team_id | uuid | YES | - |
| event_type | text | YES | 'runway' |
| event_date | date | YES | - |
| cover_image_url | text | YES | - |
| venue_id | uuid | NO | - |
| status | text | YES | 'draft' |

### `event_phases`
| Column | Type | Nullable | Default |
|---|---|---|---|
| id | uuid | NO | gen_random_uuid() |
| event_id | uuid | NO | - |
| phase_name | text | NO | - |
| phase_key | text | NO | - |
| description | text | YES | - |
| status | USER-DEFINED | YES | 'not_started'::phase_status |
| order_index | integer | NO | - |
| start_date | date | YES | - |
| target_completion_date | date | YES | - |
| actual_completion_date | date | YES | - |
| created_at | timestamptz | YES | now() |
| updated_at | timestamptz | YES | now() |
| name | text | NO | - |

### `tasks`
| Column | Type | Nullable | Default |
|---|---|---|---|
| id | uuid | NO | gen_random_uuid() |
| phase_id | uuid | NO | - |
| title | text | NO | - |
| description | text | YES | - |
| status | USER-DEFINED | YES | 'todo'::task_status |
| due_date | date | YES | - |
| completed_at | timestamptz | YES | - |
| created_at | timestamptz | YES | now() |
| updated_at | timestamptz | YES | now() |
| priority | USER-DEFINED | YES | 'medium'::task_priority |
| event_id | uuid | NO | - |

### `task_assignees`
| Column | Type | Nullable | Default |
|---|---|---|---|
| id | uuid | NO | gen_random_uuid() |
| task_id | uuid | NO | - |
| assignee_id | uuid | NO | - |
| created_at | timestamptz | YES | now() |
| stakeholder_id | uuid | YES | - |

### `venues`
| Column | Type | Nullable | Default |
|---|---|---|---|
| id | uuid | NO | gen_random_uuid() |
| owner_id | uuid | YES | - |
| name | text | NO | - |
| description | text | YES | - |
| address | text | YES | - |
| city | text | NO | - |
| country | text | YES | - |
| capacity | integer | YES | - |
| geo_lat | double precision | YES | - |
| geo_lng | double precision | YES | - |
| amenities | ARRAY | YES | - |
| created_at | timestamptz | YES | now() |
| updated_at | timestamptz | YES | now() |
| created_by | uuid | YES | - |
| type | USER-DEFINED | YES | - |
| indoor_outdoor | USER-DEFINED | YES | 'indoor'::indoor_outdoor |
| contact_name | text | YES | - |
| contact_email | text | YES | - |
| contact_phone | text | YES | - |
| notes | text | YES | - |

### `venue_availability`
| Column | Type | Nullable | Default |
|---|---|---|---|
| id | uuid | NO | gen_random_uuid() |
| venue_id | uuid | NO | - |
| start_time | timestamptz | NO | - |
| end_time | timestamptz | NO | - |
| event_id | uuid | YES | - |
| notes | text | YES | - |
| created_at | timestamptz | YES | now() |
| status | USER-DEFINED | YES | 'available'::availability_status |
| date | date | YES | - |
| start_time_only | time | YES | - |
| end_time_only | time | YES | - |
| is_available | boolean | YES | - |

### `event_schedules`
| Column | Type | Nullable | Default |
|---|---|---|---|
| id | uuid | NO | gen_random_uuid() |
| event_id | uuid | NO | - |
| title | text | NO | - |
| description | text | YES | - |
| start_time | timestamptz | NO | - |
| end_time | timestamptz | YES | - |
| location_in_venue | text | YES | - |
| speaker_names | ARRAY | YES | - |
| created_at | timestamptz | YES | now() |
| type | text | YES | - |

### `event_rehearsals`
| Column | Type | Nullable | Default |
|---|---|---|---|
| id | uuid | NO | gen_random_uuid() |
| event_id | uuid | NO | - |
| start_time | timestamptz | NO | - |
| end_time | timestamptz | NO | - |
| location | text | YES | - |
| rehearsal_lead_id | uuid | YES | - |
| notes | text | YES | - |
| created_at | timestamptz | NO | now() |

---

## 3. Fashion Entities & Casting

### `model_profiles`
| Column | Type | Nullable | Default |
|---|---|---|---|
| id | uuid | NO | gen_random_uuid() |
| profile_id | uuid | YES | - |
| agency_id | uuid | YES | - |
| name | text | NO | - |
| email | text | YES | - |
| phone | text | YES | - |
| height_cm | integer | YES | - |
| bust_cm | integer | YES | - |
| waist_cm | integer | YES | - |
| hips_cm | integer | YES | - |
| shoe_size | text | YES | - |
| hair_color | text | YES | - |
| eye_color | text | YES | - |
| portfolio_url | text | YES | - |
| instagram_handle | text | YES | - |
| created_at | timestamptz | YES | now() |
| updated_at | timestamptz | YES | now() |
| shoe_size_eu | numeric | YES | - |
| eyes_color | text | YES | - |

### `model_agencies`
| Column | Type | Nullable | Default |
|---|---|---|---|
| id | uuid | NO | gen_random_uuid() |
| name | text | NO | - |
| contact_email | text | YES | - |
| contact_phone | text | YES | - |
| website_url | text | YES | - |
| created_at | timestamptz | YES | now() |
| updated_at | timestamptz | YES | now() |

### `model_availability`
| Column | Type | Nullable | Default |
|---|---|---|---|
| id | uuid | NO | gen_random_uuid() |
| model_profile_id | uuid | NO | - |
| start_time | timestamptz | NO | - |
| end_time | timestamptz | NO | - |
| event_id | uuid | YES | - |
| notes | text | YES | - |
| created_at | timestamptz | YES | now() |
| status | USER-DEFINED | YES | 'available'::availability_status |
| date | date | YES | - |
| start_time_only | time | YES | - |
| end_time_only | time | YES | - |

### `fashion_brands`
| Column | Type | Nullable | Default |
|---|---|---|---|
| id | uuid | NO | gen_random_uuid() |
| name | text | NO | - |
| description | text | YES | - |
| website_url | text | YES | - |
| logo_url | text | YES | - |
| created_at | timestamptz | YES | now() |
| updated_at | timestamptz | YES | now() |

### `fashion_show_designer_profiles`
| Column | Type | Nullable | Default |
|---|---|---|---|
| id | uuid | NO | uuid_generate_v4() |
| brand_id | uuid | YES | - |
| user_id | uuid | YES | - |
| full_name | text | NO | - |
| role | text | YES | 'head_designer'::text |
| bio | text | YES | - |
| created_at | timestamptz | NO | now() |
| updated_at | timestamptz | NO | now() |
| collection_description | text | YES | - |

### `designer_availability`
| Column | Type | Nullable | Default |
|---|---|---|---|
| id | uuid | NO | gen_random_uuid() |
| brand_id | uuid | NO | - |
| start_time | timestamptz | NO | - |
| end_time | timestamptz | NO | - |
| event_id | uuid | YES | - |
| notes | text | YES | - |
| created_at | timestamptz | YES | now() |
| status | USER-DEFINED | YES | 'available'::availability_status |
| date | date | YES | - |
| start_time_only | time | YES | - |
| end_time_only | time | YES | - |
| designer_id | uuid | YES | - |

### `stakeholders`
| Column | Type | Nullable | Default |
|---|---|---|---|
| id | uuid | NO | gen_random_uuid() |
| profile_id | uuid | YES | - |
| name | text | NO | - |
| email | text | YES | - |
| phone | text | YES | - |
| role | USER-DEFINED | NO | - |
| specializations | ARRAY | YES | - |
| availability_status | text | YES | 'active'::text |
| profile_image_url | text | YES | - |
| instagram_handle | text | YES | - |
| created_at | timestamptz | YES | now() |
| updated_at | timestamptz | YES | now() |
| created_by | uuid | YES | - |
| linked_user_id | uuid | YES | - |
| notes | text | YES | - |
| fashion_show_role | USER-DEFINED | YES | - |

---

## 4. Event Operations

### `event_models`
| Column | Type | Nullable | Default |
|---|---|---|---|
| id | uuid | NO | gen_random_uuid() |
| event_id | uuid | NO | - |
| model_profile_id | uuid | NO | - |
| look_count | integer | YES | 1 |
| fitting_status | USER-DEFINED | YES | 'pending'::fitting_status |
| fitting_date | timestamptz | YES | - |
| rate | numeric | YES | - |
| notes | text | YES | - |
| created_at | timestamptz | YES | now() |
| updated_at | timestamptz | YES | now() |
| is_opening | boolean | YES | false |
| is_closing | boolean | YES | false |
| model_id | uuid | NO | - |
| status | USER-DEFINED | YES | 'pending_review'::model_status |

### `event_designers`
| Column | Type | Nullable | Default |
|---|---|---|---|
| id | uuid | NO | gen_random_uuid() |
| event_id | uuid | NO | - |
| brand_id | uuid | YES | - |
| designer_name | text | YES | - |
| collection_name | text | YES | - |
| created_at | timestamptz | YES | now() |
| designer_id | uuid | YES | - |
| is_primary_designer | boolean | YES | true |

### `event_stakeholders`
| Column | Type | Nullable | Default |
|---|---|---|---|
| id | uuid | NO | gen_random_uuid() |
| event_id | uuid | NO | - |
| stakeholder_id | uuid | NO | - |
| role | text | NO | - |
| notes | text | YES | - |
| created_at | timestamptz | YES | now() |
| updated_at | timestamptz | YES | now() |

### `event_sponsors`
| Column | Type | Nullable | Default |
|---|---|---|---|
| id | uuid | NO | gen_random_uuid() |
| event_id | uuid | NO | - |
| sponsor_org_id | uuid | NO | - |
| package_id | uuid | YES | - |
| tier | USER-DEFINED | NO | - |
| amount | numeric | YES | - |
| deliverables | jsonb | YES | - |
| contract_url | text | YES | - |
| status | text | YES | 'pending'::text |
| created_at | timestamptz | YES | now() |
| updated_at | timestamptz | YES | now() |
| organization_id | uuid | NO | - |

### `call_times`
| Column | Type | Nullable | Default |
|---|---|---|---|
| id | uuid | NO | gen_random_uuid() |
| event_id | uuid | NO | - |
| schedule_item_id | uuid | YES | - |
| model_profile_id | uuid | YES | - |
| stakeholder_id | uuid | YES | - |
| call_time | timestamptz | NO | - |
| notes | text | YES | - |
| created_at | timestamptz | YES | now() |
| date | date | YES | - |
| time | time | YES | - |
| model_id | uuid | YES | - |
| designer_id | uuid | YES | - |
| location | text | YES | - |

---

## 5. Assets & Media

### `assets`
| Column | Type | Nullable | Default |
|---|---|---|---|
| id | uuid | NO | uuid_generate_v4() |
| shoot_id | uuid | YES | - |
| url | text | NO | - |
| asset_type | USER-DEFINED | NO | - |
| thumbnail_url | text | YES | - |
| file_size | bigint | YES | - |
| mime_type | text | YES | - |
| width | integer | YES | - |
| height | integer | YES | - |
| status | text | NO | 'final'::text |
| tags | ARRAY | YES | '{}'::text[] |
| metadata | jsonb | YES | '{}'::jsonb |
| created_at | timestamptz | NO | now() |
| updated_at | timestamptz | NO | now() |
| media_size_spec_id | uuid | YES | - |
| size_compliance | jsonb | YES | '{}'::jsonb |
| cloudinary_public_id | text | YES | - |
| shopify_exported | boolean | YES | false |
| amazon_exported | boolean | YES | false |
| instagram_published | boolean | YES | false |
| facebook_published | boolean | YES | false |
| file_path | text | NO | - |
| public_url | text | NO | - |
| type | text | NO | - |

### `asset_links`
| Column | Type | Nullable | Default |
|---|---|---|---|
| id | uuid | NO | gen_random_uuid() |
| asset_id | uuid | NO | - |
| entity_type | text | NO | - |
| entity_id | uuid | NO | - |
| role | text | NO | 'gallery'::text |
| metadata | jsonb | YES | '{}'::jsonb |
| created_at | timestamptz | NO | now() |
| updated_at | timestamptz | NO | now() |

### `asset_variants`
| Column | Type | Nullable | Default |
|---|---|---|---|
| id | uuid | NO | uuid_generate_v4() |
| asset_id | uuid | NO | - |
| media_size_spec_id | uuid | YES | - |
| url | text | NO | - |
| width | integer | NO | - |
| height | integer | NO | - |
| file_size | bigint | YES | - |
| format | text | NO | - |
| quality | integer | YES | - |
| cloudinary_public_id | text | YES | - |
| is_primary | boolean | YES | false |
| status | text | NO | 'ready'::text |
| created_at | timestamptz | NO | now() |
| updated_at | timestamptz | NO | now() |

### `media_size_specs`
| Column | Type | Nullable | Default |
|---|---|---|---|
| id | uuid | NO | uuid_generate_v4() |
| platform | text | NO | - |
| use_case | text | NO | - |
| recommended_width | integer | NO | - |
| recommended_height | integer | NO | - |
| aspect_ratio | text | YES | - |
| display_name | text | NO | - |
| notes | text | YES | - |
| is_active | boolean | NO | true |
| created_at | timestamptz | NO | now() |
| updated_at | timestamptz | NO | now() |

### `cloudinary_assets`
| Column | Type | Nullable | Default |
|---|---|---|---|
| id | uuid | NO | uuid_generate_v4() |
| asset_id | uuid | NO | - |
| public_id | text | NO | - |
| resource_type | text | NO | 'image'::text |
| format | text | YES | - |
| version | integer | YES | - |
| url | text | NO | - |
| secure_url | text | NO | - |
| width | integer | YES | - |
| height | integer | YES | - |
| bytes | bigint | YES | - |
| duration | double precision | YES | - |
| metadata | jsonb | YES | '{}'::jsonb |
| created_at | timestamptz | NO | now() |
| updated_at | timestamptz | NO | now() |

### `event_assets`
| Column | Type | Nullable | Default |
|---|---|---|---|
| id | uuid | NO | gen_random_uuid() |
| event_id | uuid | NO | - |
| type | text | NO | - |
| url | text | NO | - |
| alt_text | text | YES | - |
| is_featured | boolean | YES | false |
| generation_prompt | text | YES | - |
| generation_status | text | YES | - |
| created_at | timestamptz | YES | now() |

### `shoot_assets`
| Column | Type | Nullable | Default |
|---|---|---|---|
| id | uuid | NO | uuid_generate_v4() |
| shoot_id | uuid | NO | - |
| url | text | NO | - |
| filename | text | YES | - |
| file_type | text | YES | - |
| metadata | jsonb | YES | - |
| is_final | boolean | YES | false |
| uploaded_at | timestamptz | NO | now() |

---

## 6. Commerce & Integrations

### `shopify_shops`
| Column | Type | Nullable | Default |
|---|---|---|---|
| id | uuid | NO | uuid_generate_v4() |
| user_id | uuid | NO | - |
| shop_domain | text | NO | - |
| shop_name | text | YES | - |
| access_token | text | NO | - |
| scope | text | NO | - |
| status | text | NO | 'active'::text |
| installed_at | timestamptz | NO | now() |
| uninstalled_at | timestamptz | YES | - |
| last_sync_at | timestamptz | YES | - |
| created_at | timestamptz | NO | now() |
| updated_at | timestamptz | NO | now() |

### `shopify_products`
| Column | Type | Nullable | Default |
|---|---|---|---|
| id | uuid | NO | uuid_generate_v4() |
| shop_id | uuid | NO | - |
| shopify_product_id | text | NO | - |
| shopify_variant_id | text | YES | - |
| title | text | NO | - |
| handle | text | YES | - |
| product_type | text | YES | - |
| vendor | text | YES | - |
| tags | ARRAY | YES | - |
| status | text | YES | - |
| images | jsonb | YES | - |
| description | text | YES | - |
| synced_at | timestamptz | YES | - |
| created_at | timestamptz | NO | now() |
| updated_at | timestamptz | NO | now() |
| external_id | text | NO | - |

### `shopify_media_links`
| Column | Type | Nullable | Default |
|---|---|---|---|
| id | uuid | NO | uuid_generate_v4() |
| asset_id | uuid | NO | - |
| shopify_product_id | uuid | NO | - |
| shopify_media_id | text | YES | - |
| exported_at | timestamptz | NO | now() |
| created_at | timestamptz | NO | now() |

### `amazon_connections`
| Column | Type | Nullable | Default |
|---|---|---|---|
| id | uuid | NO | uuid_generate_v4() |
| user_id | uuid | NO | - |
| seller_id | text | NO | - |
| marketplace_ids | ARRAY | NO | - |
| refresh_token | text | NO | - |
| access_token | text | YES | - |
| token_expires_at | timestamptz | YES | - |
| status | text | NO | 'connected'::text |
| last_sync_at | timestamptz | YES | - |
| created_at | timestamptz | NO | now() |
| updated_at | timestamptz | NO | now() |

### `amazon_products`
| Column | Type | Nullable | Default |
|---|---|---|---|
| id | uuid | NO | uuid_generate_v4() |
| seller_id | text | NO | - |
| sku | text | NO | - |
| asin | text | YES | - |
| title | text | YES | - |
| images | jsonb | YES | - |
| status | text | YES | - |
| synced_at | timestamptz | YES | - |
| created_at | timestamptz | NO | now() |
| updated_at | timestamptz | NO | now() |
| external_id | text | NO | - |
| connection_id | uuid | NO | - |

### `amazon_media_links`
| Column | Type | Nullable | Default |
|---|---|---|---|
| id | uuid | NO | uuid_generate_v4() |
| asset_id | uuid | NO | - |
| amazon_product_id | uuid | NO | - |
| image_type | text | YES | 'Main'::text |
| status | text | YES | 'pending'::text |
| submission_id | text | YES | - |
| exported_at | timestamptz | NO | now() |
| created_at | timestamptz | NO | now() |

### `facebook_connections`
| Column | Type | Nullable | Default |
|---|---|---|---|
| id | uuid | NO | uuid_generate_v4() |
| user_id | uuid | NO | - |
| facebook_page_id | text | NO | - |
| facebook_page_name | text | YES | - |
| access_token | text | NO | - |
| token_expires_at | timestamptz | YES | - |
| status | text | NO | 'connected'::text |
| last_sync_at | timestamptz | YES | - |
| created_at | timestamptz | NO | now() |
| updated_at | timestamptz | NO | now() |

### `facebook_posts`
| Column | Type | Nullable | Default |
|---|---|---|---|
| id | uuid | NO | uuid_generate_v4() |
| connection_id | uuid | NO | - |
| facebook_post_id | text | YES | - |
| message | text | YES | - |
| link | text | YES | - |
| asset_ids | ARRAY | YES | - |
| status | text | NO | 'published'::text |
| published_at | timestamptz | YES | - |
| like_count | integer | YES | 0 |
| comment_count | integer | YES | 0 |
| share_count | integer | YES | 0 |
| created_at | timestamptz | NO | now() |
| updated_at | timestamptz | NO | now() |
| external_id | text | NO | - |

### `instagram_connections`
| Column | Type | Nullable | Default |
|---|---|---|---|
| id | uuid | NO | uuid_generate_v4() |
| user_id | uuid | NO | - |
| instagram_account_id | text | NO | - |
| instagram_username | text | YES | - |
| access_token | text | NO | - |
| token_expires_at | timestamptz | YES | - |
| status | text | NO | 'connected'::text |
| last_sync_at | timestamptz | YES | - |
| created_at | timestamptz | NO | now() |
| updated_at | timestamptz | NO | now() |

### `instagram_posts`
| Column | Type | Nullable | Default |
|---|---|---|---|
| id | uuid | NO | uuid_generate_v4() |
| connection_id | uuid | NO | - |
| instagram_media_id | text | YES | - |
| media_type | text | NO | - |
| permalink | text | YES | - |
| caption | text | YES | - |
| hashtags | ARRAY | YES | - |
| location_name | text | YES | - |
| asset_ids | ARRAY | YES | - |
| status | text | NO | 'published'::text |
| scheduled_at | timestamptz | YES | - |
| published_at | timestamptz | YES | - |
| like_count | integer | YES | 0 |
| comment_count | integer | YES | 0 |
| created_at | timestamptz | NO | now() |
| updated_at | timestamptz | NO | now() |
| external_id | text | NO | - |

---

## 7. Service Booking (Shoots)

### `shoots`
| Column | Type | Nullable | Default |
|---|---|---|---|
| id | uuid | NO | uuid_generate_v4() |
| designer_id | uuid | YES | - |
| shoot_type | USER-DEFINED | NO | - |
| fashion_category | text | NO | - |
| style_type | text | NO | - |
| product_size | text | YES | - |
| platform_format | text | NO | - |
| booking_date | date | YES | - |
| start_time | time | YES | - |
| duration_hours | integer | YES | - |
| location | text | YES | - |
| special_requests | text | YES | - |
| total_price | numeric | YES | - |
| deposit_amount | numeric | YES | - |
| deposit_paid | boolean | YES | false |
| brief_data | jsonb | YES | '{}'::jsonb |
| status | USER-DEFINED | YES | 'draft'::shoot_status_v2 |
| created_at | timestamptz | NO | now() |
| updated_at | timestamptz | NO | now() |
| title | text | NO | - |
| description | text | YES | - |
| shooting_date | timestamptz | YES | - |
| client_id | uuid | YES | - |

### `shoot_items`
| Column | Type | Nullable | Default |
|---|---|---|---|
| id | uuid | NO | uuid_generate_v4() |
| shoot_id | uuid | NO | - |
| name | text | NO | - |
| instructions | text | YES | - |
| reference_image_url | text | YES | - |
| status | text | YES | 'pending'::text |
| created_at | timestamptz | NO | now() |

### `shoot_payments`
| Column | Type | Nullable | Default |
|---|---|---|---|
| id | uuid | NO | uuid_generate_v4() |
| shoot_id | uuid | NO | - |
| user_id | uuid | YES | - |
| amount | numeric | NO | - |
| provider_payment_id | text | YES | - |
| status | USER-DEFINED | YES | 'pending'::payment_status |
| created_at | timestamptz | NO | now() |

---

## 8. Ticketing & Payments

### `registrations`
| Column | Type | Nullable | Default |
|---|---|---|---|
| id | uuid | NO | gen_random_uuid() |
| event_id | uuid | NO | - |
| ticket_tier_id | uuid | NO | - |
| profile_id | uuid | YES | - |
| attendee_email | text | NO | - |
| attendee_name | text | NO | - |
| status | USER-DEFINED | YES | 'pending'::registration_status |
| qr_code_data | text | YES | - |
| checked_in_at | timestamptz | YES | - |
| created_at | timestamptz | YES | now() |
| updated_at | timestamptz | YES | now() |
| user_id | uuid | YES | - |

### `ticket_tiers`
| Column | Type | Nullable | Default |
|---|---|---|---|
| id | uuid | NO | gen_random_uuid() |
| event_id | uuid | NO | - |
| name | text | NO | - |
| description | text | YES | - |
| type | USER-DEFINED | YES | 'paid'::ticket_tier_type |
| price | numeric | YES | 0.00 |
| currency | text | YES | 'USD'::text |
| quantity_total | integer | NO | - |
| quantity_sold | integer | YES | 0 |
| sales_start_at | timestamptz | YES | - |
| sales_end_at | timestamptz | YES | - |
| created_at | timestamptz | YES | now() |
| quantity_available | integer | YES | - |

### `payments`
| Column | Type | Nullable | Default |
|---|---|---|---|
| id | uuid | NO | gen_random_uuid() |
| registration_id | uuid | NO | - |
| payer_id | uuid | YES | - |
| amount | numeric | NO | - |
| currency | text | YES | 'USD'::text |
| status | USER-DEFINED | YES | 'pending'::payment_status |
| provider | text | YES | 'stripe'::text |
| provider_payment_id | text | YES | - |
| created_at | timestamptz | YES | now() |

### `sponsor_organizations`
| Column | Type | Nullable | Default |
|---|---|---|---|
| id | uuid | NO | gen_random_uuid() |
| name | text | NO | - |
| description | text | YES | - |
| website_url | text | YES | - |
| logo_url | text | YES | - |
| industry | text | YES | - |
| contact_email | text | YES | - |
| contact_name | text | YES | - |
| contact_phone | text | YES | - |
| created_at | timestamptz | YES | now() |
| updated_at | timestamptz | YES | now() |

### `sponsorship_packages`
| Column | Type | Nullable | Default |
|---|---|---|---|
| id | uuid | NO | gen_random_uuid() |
| name | text | NO | - |
| tier | USER-DEFINED | NO | - |
| price | numeric | YES | - |
| deliverables | jsonb | YES | - |
| created_at | timestamptz | YES | now() |

---

## 9. System

### `supabase_migrations`
| Column | Type | Nullable | Default |
|---|---|---|---|
| version | text | NO | - |
| name | text | NO | - |
| statements | text | NO | - |
| checksum | text | NO | - |
| executed_at | timestamptz | NO | - |