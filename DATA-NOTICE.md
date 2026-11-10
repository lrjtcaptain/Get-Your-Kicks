# Data sources

Mapped restaurant records and route geometry contain © OpenStreetMap contributors data, available under the Open Database License (ODbL) 1.0: https://www.openstreetmap.org/copyright and https://opendatacommons.org/licenses/odbl/1-0/ . The OSM-derived portion of this database is provided under that license. Attribute OpenStreetMap contributors when reusing it and comply with ODbL share-alike requirements.

The 2026-11-10 restaurant import used the public ArcGIS-hosted OpenStreetMap North America POI layer: https://services6.arcgis.com/Do88DoK2xjTUCXd1/arcgis/rest/services/OSM_NA_POIs/FeatureServer/0 . All 3,510 indexed food records in the regional bounding envelope were retrieved in batches, then filtered against the saved I-88/I-80 route to a two-mile geographic corridor. This is mapped coverage, not a guarantee that every business is represented or currently operating. It includes restaurants, fast food, cafés, ice cream and food courts. Driving detours and business exits remain unverified unless a record explicitly includes a sourced exit.

Other records retain their own sources: official business locators, Illinois Tollway, Iowa DOT and Kwik Trip/Star. Rest-area availability, opening hours, gas prices and parking occupancy are not live. Source links are stored per record. The public JSON road pack and SQLite database are downloadable from this repository.
