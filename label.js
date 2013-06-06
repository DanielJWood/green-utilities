/*
	Leaflet.label, a plugin that adds labels to markers and vectors for Leaflet powered maps.
	(c) 2012-2013, Jacob Toye, Smartrak

	https://github.com/Leaflet/Leaflet.label
	http://leafletjs.com
	https://github.com/jacobtoye
*/
(function(){L.labelVersion="0.1.3",L.Label=L.Popup.extend({options:{autoPan:!1,className:"",closePopupOnClick:!1,noHide:!1,offset:new L.Point(12,-15),opacity:1},onAdd:function(t){this._map=t,this._pane=this._source instanceof L.Marker?t._panes.markerPane:t._panes.popupPane,this._container||this._initLayout(),this._updateContent();var e=t.options.fadeAnimation;e&&L.DomUtil.setOpacity(this._container,0),this._pane.appendChild(this._container),t.on("viewreset",this._updatePosition,this),this._animated&&t.on("zoomanim",this._zoomAnimation,this),L.Browser.touch&&!this.options.noHide&&L.DomEvent.on(this._container,"click",this.close,this),this._update(),this.setOpacity(this.options.opacity)},onRemove:function(t){this._pane.removeChild(this._container),L.Util.falseFn(this._container.offsetWidth),t.off({viewreset:this._updatePosition,zoomanim:this._zoomAnimation},this),t.options.fadeAnimation&&L.DomUtil.setOpacity(this._container,0),this._map=null},close:function(){var t=this._map;L.Browser.touch&&!this.options.noHide&&L.DomEvent.off(this._container,"click",this.close),t&&(t._label=null,t.removeLayer(this))},updateZIndex:function(t){this._zIndex=t,this._container&&(this._container.style.zIndex=t)},setOpacity:function(t){this.options.opacity=t,this._container&&L.DomUtil.setOpacity(this._container,t)},_initLayout:function(){this._container=L.DomUtil.create("div","leaflet-label "+this.options.className+" leaflet-zoom-animated"),this.updateZIndex(this._zIndex)},_updateContent:function(){this._content&&"string"==typeof this._content&&(this._container.innerHTML=this._content)},_updateLayout:function(){},_updatePosition:function(){var t=this._map.latLngToLayerPoint(this._latlng);this._setPosition(t)},_setPosition:function(t){t=t.add(this.options.offset),L.DomUtil.setPosition(this._container,t)},_zoomAnimation:function(t){var e=this._map._latLngToNewLayerPoint(this._latlng,t.zoom,t.center);this._setPosition(e)}}),L.Icon.Default.mergeOptions({labelAnchor:new L.Point(9,-20)}),L.Marker.mergeOptions({icon:new L.Icon.Default}),L.Marker.include({showLabel:function(){return this._label&&this._map&&(this._label.setLatLng(this._latlng),this._map.showLabel(this._label)),this},hideLabel:function(){return this._label&&this._label.close(),this},setLabelNoHide:function(t){this._labelNoHide!==t&&(this._labelNoHide=t,t?(this._removeLabelRevealHandlers(),this.showLabel()):(this._addLabelRevealHandlers(),this.hideLabel()))},bindLabel:function(t,e){var i=L.point(this.options.icon.options.labelAnchor)||new L.Point(0,0);return i=i.add(L.Label.prototype.options.offset),e&&e.offset&&(i=i.add(e.offset)),e=L.Util.extend({offset:i},e),this._labelNoHide=e.noHide,this._label||(this._labelNoHide||this._addLabelRevealHandlers(),this.on("remove",this.hideLabel,this).on("move",this._moveLabel,this),this._hasLabelHandlers=!0),this._label=new L.Label(e,this).setContent(t),this},unbindLabel:function(){return this._label&&(this.hideLabel(),this._label=null,this._hasLabelHandlers&&(this._labelNoHide||this._removeLabelRevealHandlers(),this.off("remove",this.hideLabel,this).off("move",this._moveLabel,this)),this._hasLabelHandlers=!1),this},updateLabelContent:function(t){this._label&&this._label.setContent(t)},_addLabelRevealHandlers:function(){this.on("mouseover",this.showLabel,this).on("mouseout",this.hideLabel,this),L.Browser.touch&&this.on("click",this.showLabel,this)},_removeLabelRevealHandlers:function(){this.off("mouseover",this.showLabel,this).off("mouseout",this.hideLabel,this).off("remove",this.hideLabel,this).off("move",this._moveLabel,this),L.Browser.touch&&this.off("click",this.showLabel,this)},_moveLabel:function(t){this._label.setLatLng(t.latlng)},_originalUpdateZIndex:L.Marker.prototype._updateZIndex,_updateZIndex:function(t){var e=this._zIndex+t;this._originalUpdateZIndex(t),this._label&&this._label.updateZIndex(e)},_originalSetOpacity:L.Marker.prototype.setOpacity,setOpacity:function(t,e){this.options.labelHasSemiTransparency=e,this._originalSetOpacity(t)},_originalUpdateOpacity:L.Marker.prototype._updateOpacity,_updateOpacity:function(){var t=0===this.options.opacity?0:1;this._originalUpdateOpacity(),this._label&&this._label.setOpacity(this.options.labelHasSemiTransparency?this.options.opacity:t)}}),L.Path.include({bindLabel:function(t,e){return this._label&&this._label.options===e||(this._label=new L.Label(e,this)),this._label.setContent(t),this._showLabelAdded||(this.on("mouseover",this._showLabel,this).on("mousemove",this._moveLabel,this).on("mouseout remove",this._hideLabel,this),L.Browser.touch&&this.on("click",this._showLabel,this),this._showLabelAdded=!0),this},unbindLabel:function(){return this._label&&(this._hideLabel(),this._label=null,this._showLabelAdded=!1,this.off("mouseover",this._showLabel,this).off("mousemove",this._moveLabel,this).off("mouseout remove",this._hideLabel,this)),this},updateLabelContent:function(t){this._label&&this._label.setContent(t)},_showLabel:function(t){this._label.setLatLng(t.latlng),this._map.showLabel(this._label)},_moveLabel:function(t){this._label.setLatLng(t.latlng)},_hideLabel:function(){this._label.close()}}),L.Map.include({showLabel:function(t){return this._label=t,this.addLayer(t)}}),L.FeatureGroup.include({clearLayers:function(){return this.unbindLabel(),this.eachLayer(this.removeLayer,this),this},bindLabel:function(t,e){return this.invoke("bindLabel",t,e)},unbindLabel:function(){return this.invoke("unbindLabel")},updateLabelContent:function(t){this.invoke("updateLabelContent",t)}})})(this,document);