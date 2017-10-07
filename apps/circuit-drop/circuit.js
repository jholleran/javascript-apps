document.addEventListener('DOMContentLoaded', function () {
    'use strict';

    var sns="http://www.w3.org/2000/svg",
        xns="http://www.w3.org/1999/xlink",
        root = document.getElementById('circuitBoard'),
        dzs = document.getElementsByClassName('dropzone'),
        rootMatrix = root.getScreenCTM(),
        dropzonePoints = [],
        originalPoints = [],
        transformedPoints = [];


    for (var i = 0, len = dzs.length; i < len; i++) {
        //var handle = document.createElementNS(sns, 'use'),
            //point = star.points.getItem(i),
        var dz = dzs[i],
            newPoint = root.createSVGPoint();

        // handle.setAttributeNS(xns, 'href', '#point-handle');
        // handle.setAttribute('class', 'point-handle');

        // handle.x.baseVal.value = newPoint.x = point.x;
        // handle.y.baseVal.value = newPoint.y = point.y;

        newPoint.x = dz.x.baseVal.value + (dz.width.baseVal.value / 2);
        newPoint.y = dz.y.baseVal.value + (dz.height.baseVal.value / 2);

        //handle.setAttribute('data-index', i);

        dropzonePoints.push(newPoint);

        //root.appendChild(handle);
    }

    function applyTransforms (event) {
        // rootMatrix = root.getScreenCTM();

        transformedPoints = dropzonePoints.map(function(point) {
            return point.matrixTransform(rootMatrix);
        });

        interact('.res-handle').draggable({
            snap: {
                targets: transformedPoints,
                range: 50 * Math.max(rootMatrix.a, rootMatrix.d)
            }
        });
    }

    interact(root)
        .on('mousedown', applyTransforms)
        .on('touchstart', applyTransforms);

    interact('.res-handle')
        .draggable({
            onstart: function (event) {
                root.setAttribute('class', 'dragging');
            },
            onmove: function (event) {
                var i = event.target.getAttribute('data-index')|0;
                    //point = star.points.getItem(i);

                // point.x += event.dx / rootMatrix.a;
                // point.y += event.dy / rootMatrix.d;

                event.target.x.baseVal.value += event.dx / rootMatrix.a;
                event.target.y.baseVal.value += event.dy / rootMatrix.d;
            },
            onend: function (event) {
                root.setAttribute('class', '');
            },
            snap: {
               targets: dropzonePoints,
               range: 100,
               relativePoints: [ { x: 0.5, y: 0.5 } ]
            },
            restrict: { restriction: document.rootElement }
        })
        .styleCursor(false);

        interact('.dropzone').dropzone({
          // only accept elements matching this CSS selector
          accept: '.res-handle',
          // Require a 75% element overlap for a drop to be possible
          overlap: 0.75,

          // listen for drop related events:

          ondropactivate: function (event) {
            // add active dropzone feedback
            event.target.classList.add('drop-active');
          },
          ondragenter: function (event) {
            var draggableElement = event.relatedTarget,
                dropzoneElement = event.target;

            // feedback the possibility of a drop
            dropzoneElement.classList.add('drop-target');
            draggableElement.classList.add('can-drop');
            draggableElement.textContent = 'Dragged in';
          },
          ondragleave: function (event) {
            // remove the drop feedback style
            event.target.classList.remove('drop-target');
            event.relatedTarget.classList.remove('can-drop');
            event.relatedTarget.textContent = 'Dragged out';
          },
          ondrop: function (event) {
            event.relatedTarget.textContent = 'Dropped';
          },
          ondropdeactivate: function (event) {
            // remove active dropzone feedback
            event.target.classList.remove('drop-active');
            event.target.classList.remove('drop-target');
          }
        });


    document.addEventListener('dragstart', function (event) {
        event.preventDefault();
    });
});