# Tangata Whenua Place Names Proof of Concept 

https://xycarto.github.io/tangata-whenua-poc/

Site is developed using NZTM projection (ESPG:2193). As of yet, no WMTS is available for the base layers.

Website code is found under the `docs` directory of this repo.

## Repo Information

This site is only a proof of concept and functions as needed for the purposes of the site delivery. 

- The site is built employing a raster tile base map and vector tile overlay. Place names for the project are only a small sample.  Styling of the vector tile is handled through the JS and CSS. Past attempts were made to develop the vector tile styling using the Mapbox vector tiling style JSON through the Openlayers ol-mapbox-style, https://github.com/openlayers/ol-mapbox-style. As of Jun 2021, ol-mapbox-style, is still not up for the full task. Issue persist primarily around using the JSOn stye file and automatic label placement. Currently, ol-mapbox cannot do this without changes to Openlayers declutter.

- In order to handle this in the future, one solution is to develop a ranking for the place names. This ranking would be developed with zoom scale and label importance in mind. With these attributes hard coded, it would be possible to handle labelling using a full JS solution.

- It is still necessary to develop sprites for this project.

- The base map for this project is raster tile set up.  

- Base data for this project is from LINZ Data Service, Landcare Research, New Zealand Minstery for the Environment, and the New Zealand Geographic Board CC-BY 4.0.

## Tools for base maps creation

- [MapProxy](https://mapproxy.org/)
- [TREX](https://t-rex.tileserver.ch/)
- [Tilemill](https://github.com/schachmett/docker-tilemill)
- [Openlayers6](https://openlayers.org/)
- [PostgreSQl/PostGIS](https://postgis.net/)
- [shp2pgsql](https://manpages.ubuntu.com/manpages/bionic/man1/shp2pgsql.1.html)

## Base Maps Data

- Place names sample layer provided by NZGB
- [LINZ 8m DEM](https://data.linz.govt.nz/layer/51768-nz-8m-digital-elevation-model-2012/)
- [Land Cover Database 4.0](https://koordinates.com/from/lris.scinfo.org.nz/layer/48412/)
- [MfE Riverflows](https://koordinates.com/from/data.mfe.govt.nz/layer/53309/)
- [LINZ River Names Pilot](https://data.linz.govt.nz/layer/103632-nz-river-name-lines-pilot/)
- [LINZ Coastline and Islands Polygons](https://data.linz.govt.nz/layer/51153-nz-coastlines-and-islands-polygons-topo-150k/)


## Raster tiles

Raster tile base maps are styled and developed using Tilemill. Tilemill for this project is accessed via Docker. Tilemill is utilized primarily for styling and producing Mapnik XML documents for rendering in MapProxy.  In this project, vector data for use in Tilemill is uploaded to a PostgreSQL data base. Psql is a much more efficient way to handle vectors for rendering.  

Uploading vectors to PsoatgreSQL:

```
shp2pgsql -s 2193 /inSHP.shp schema.inSHP | psql -h <yourHost> -d <yourDB> -U <yourUserName>
```

Tilemill will export the needed XML document.  