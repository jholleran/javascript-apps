var module = angular.module("lvl.directives.dragdrop", ['lvl.services']);

module.directive('svgDrag', ['$rootScope', 'uuid', '$document', function($rootScope, uuid, $document) {
	    return {
	        restrict: 'A',
	        link: function(scope, el, attrs, controller) {
	        	console.log("draggable element");

				var currentX, currentY, x = 0, y = 0, 
					start, stop, drag, container, selectedElement, currentMatrix;
	            var scale = 800 / Math.min(window.innerWidth, window.innerHeight);
				var gridSpace = 20;

	            angular.element(el).attr("draggable", "true");
	            var id = angular.element(el).attr("id");
	            
	            if (!id) {
	                id = uuid.new()
	                angular.element(el).attr("id", id);
	            }

  				el.bind("dragstart", function(e) {
  					selectElement(e);
	                e.dataTransfer.setData('text', id);

	                $rootScope.$emit("LVL-DRAG-START");
	            });
	            
	            el.bind("dragend", function(e) {
	            	deselectElement(e);
	                $rootScope.$emit("LVL-DRAG-END");
	            });

	            el.bind("drag", function(e) {
	            	moveElement(e);
	            	checkDropZones(e);
	                //console.log("dragging: " + id);
	            });

	            function selectElement(evt) {
					selectedElement = evt.target;
					if(selectedElement.hasAttribute("transform")) {
						currentX = evt.clientX;
						currentY = evt.clientY;
						currentMatrix = selectedElement.getAttributeNS(null, "transform").slice(7,-1).split(' ');

						for(var i=0; i<currentMatrix.length; i++) {
							currentMatrix[i] = parseFloat(currentMatrix[i]);
						}
					}
	            }

	            function moveElement(evt){
				    dx = evt.clientX - currentX;
				    dy = evt.clientY - currentY;

					dx *= scale;
       				dy *= scale;

				    currentMatrix[4] += dx;
				    currentMatrix[5] += dy;

				    newMatrix = "matrix(" + currentMatrix.join(' ') + ")";
				        //console.log("matrix: ", newMatrix);      
				    selectedElement.setAttributeNS(null, "transform", newMatrix);
//console.log("se: ", selectedElement);
				    currentX = evt.clientX;
				    currentY = evt.clientY;
				  }

				  function deselectElement(evt){
				    if(selectedElement != 0){
				      //$document.unbind('mousemove', moveElement);
				      //$document.unbind('mouseup', deselectElement);
				      //document.body.removeEventListener('mouseout', deselectElement);

					    var p = nearestGridPosition({x : currentMatrix[4], y : currentMatrix[5]});
					    currentMatrix[4] = p.x;
					    currentMatrix[5] = p.y;

					    newMatrix = "matrix(" + currentMatrix.join(' ') + ")";
					        console.log("matrix: ", newMatrix);      
					    selectedElement.setAttributeNS(null, "transform", newMatrix);
					    selectedElement = 0;
				    }
				  }

				    function nearestGridPosition(p) {
					    var xRemainder = p.x % gridSpace;
					    var yRemainder = p.y % gridSpace;
					    var x, y = 0;

					    if(xRemainder > (gridSpace / 2)) {
					      x = p.x + (gridSpace - xRemainder);
					    } else {
					      x = p.x - xRemainder;
					    }

					    if(yRemainder > (gridSpace / 2)) {
					      y = p.y + (gridSpace - yRemainder);
					    } else {
					      y = p.y - yRemainder;
					    }


					    //console.log("x remainder", xRemainder);
					    //console.log('old move resistor at', p.x, p.y);
					    //console.log('new move resistor at', x, y);
					    return {
					      x: x,
					      y: y
					    }
					}

					function toRec(element) {
						var adz = angular.element(element);
						return {
							x: parseInt(adz.attr('x')),
							y: parseInt(adz.attr('y')),
							width: parseInt(adz.attr('width')),
							height: parseInt(adz.attr('height'))
						}
					}

					function dropZoneCheck(evt, dz) {
						var rect0 = toRec(dz),
						rect1 = {
							x: evt.clientX * scale,
							y: evt.clientY * scale,
							width: 36,
							height: 100
						};

						if(utils.rectIntersect(rect0, rect1)) {
							angular.element(dz).attr('class','lvl-over');
						} else {
							angular.element(dz).attr('class','lvl-target');
						}
					}

					function checkDropZones(evt) {
						dropZoneCheck(evt, document.getElementById("dropZone-1"));
						dropZoneCheck(evt, document.getElementById("dropZone-2"));
						dropZoneCheck(evt, document.getElementById("dropZone-3"));
					}
	            
	        }
    	}
	}]);

module.directive('svgDraggable', ['$rootScope', 'uuid', function($rootScope, uuid) {
	    return {
	        restrict: 'A',
	        link: function(scope, el, attrs, controller) {
	        	console.log("linking draggable element");

	            angular.element(el).attr("draggable", "true");
	            var id = angular.element(el).attr("id");
	            if (!id) {
	                id = uuid.new()
	                angular.element(el).attr("id", id);
	            }
	            
	            // el.bind("dragstart", function(e) {
	            //     e.dataTransfer.setData('text', id);

	            //     $rootScope.$emit("LVL-DRAG-START");
	            // });
	            
	            // el.bind("dragend", function(e) {
	            //     $rootScope.$emit("LVL-DRAG-END");
	            // });
	        }
    	}
	}]);

module.directive('svgDropTarget', ['$rootScope', 'uuid', function($rootScope, uuid) {
	    return {
	        restrict: 'A',
	        scope: {
	            onDrop: '&'
	        },
	        link: function(scope, el, attrs, controller) {
	            var id = angular.element(el).attr("id");
	            if (!id) {
	                id = uuid.new()
	                angular.element(el).attr("id", id);
	            }
	                       
	            // el.bind("dragover", function(e) {
	            //   if (e.preventDefault) {
	            //     e.preventDefault(); // Necessary. Allows us to drop.
	            //   }
	            //   //console.log("over");
	            //   e.dataTransfer.dropEffect = 'move';  // See the section on the DataTransfer object.
	            //   return false;
	            // });
	            
	            //el.bind("dragenter", function(e) {
	            	//console.log("enter");
	              // this / e.target is the current hover target.
	              //var el = document.getElementById(id);
	              //angular.element(e.target).attr('class','lvl-over');
	            //});
	            
	            //el.bind("dragleave", function(e) {
	            	//console.log("leave");
	              //var el = document.getElementById(id);
	              //angular.element(e.target).attr('class', 'lvl-target');  // this / e.target is previous target element.
	            //});
	            
	            el.bind("drop", function(e) {
	              if (e.preventDefault) {
	                e.preventDefault(); // Necessary. Allows us to drop.
	              }

	              if (e.stopPropogation) {
	                e.stopPropogation(); // Necessary. Allows us to drop.
	              }
	            	var data = e.dataTransfer.getData("text");
	                var dest = document.getElementById(id);
	                var src = document.getElementById(data);
	                
	                scope.onDrop({dragEl: src, dropEl: dest});
	            });

	            $rootScope.$on("LVL-DRAG-START", function() {
	                var el = document.getElementById(id);
	                angular.element(el).attr("class", "lvl-target");
	            });
	            
	            $rootScope.$on("LVL-DRAG-END", function() {
	                var el = document.getElementById(id);
	                angular.element(el).attr("class", "");
	            });
	        }
    	}
	}]);