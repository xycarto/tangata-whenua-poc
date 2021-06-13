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

- Base data for this project is from LINZ Data Service, Landcare Research, and the New Zealand Geographic Board CC-BY 4.0.

## Tools for base maps creation

- MapProxy
- TREX
- Tilemill
- Openlayers 6
