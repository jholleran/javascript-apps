var Circuit = (function() {

    var z1, z2, z3;


    function meter() {
        return document.getElementById("meter-display");
    }

    function levelComplete() {
        var p = document.getElementById('result');
        p.innerHTML = "Level 1 Complete. Well Done!";
    }

    function reset() {
        meter().innerHTML = "0";
        var p = document.getElementById('result');
        p.innerHTML = "";
    }

    function check() {
        if(z1 != undefined && z2 != undefined && z3 != undefined) {
            var totalResistance = z1.r + z2.r + z3.r;
            //alert(totalResistance);
            meter().innerHTML = totalResistance;
            // log(totalResistance);
            if(totalResistance == 320) {
                levelComplete();
            }
        } else {
            reset();
        }
    }
    
    return {
        connect: function(res, zone) {
            console.log(res + ' connected in zone ' + zone);
            if(zone === 1) { //TODO handle multiple zone dynamically
                z1 = {r: res};
            } else if(zone === 2) {
                z2 = {r: res};
            } else if(zone === 3) {
                z3 = {r: res};
            }
            //check();
        },
        disconnect: function(res, zone) {
            console.log(res + ' disconnected from zone ' + zone);
            if(zone === 1) {
                z1 = undefined;
            } else if(zone === 2) {
                z2 = undefined;
            } else if(zone === 3) {
                z3 = undefined;
            }
            //check();
        },
        check: check
    }
})();



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



interact('.res-handle')
    .draggable({
        onmove: function (event) {
            var target = event.target,
                x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx / rootMatrix.a,
                y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy / rootMatrix.d;

            target.style.webkitTransform =
            target.style.transform =
                'translate(' + x + 'px, ' + y + 'px)';

            target.setAttribute('data-x', x);
            target.setAttribute('data-y', y);
        },
        onend: function (event) {
            var textEl = event.target.querySelector('p');
            
            textEl && (textEl.textContent =
                'moved a distance of '
                + (Math.sqrt(event.dx * event.dx +
                             event.dy * event.dy)|0) + 'px');
        }
    })
    .inertia(true)
    .restrict({
        drag: "",
        endOnly: true,
        elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
    })
    .snap({
        mode: 'anchor',
        anchors: [],
        range: Infinity,
        elementOrigin: { x: 0.5, y: 0.5 },
        endOnly: true
    })
    .on('dragstart', function (event) {
        var startX = parseFloat(event.target.getAttribute('data-sx'));
        var startY = parseFloat(event.target.getAttribute('data-sy'));
        if (!startX && !startY) {
          var rect = interact.getElementRect(event.target);

          // record center point when starting the very first a drag
          var startPos = {
            x: rect.left + rect.width  / 2,
            y: rect.top  + rect.height / 2
          }

          startX = startPos.x;
          startY = startPos.y;

          event.target.setAttribute('data-sx', startPos.x);
          event.target.setAttribute('data-sy', startPos.y);
        }

        var newStartPos = {
            x: startX,
            y: startY
        }

        // snap to the start position
        event.interactable.snap({ anchors: [newStartPos] });
    });


interact('.dropzone')
    // enable draggables to be dropped into this
    .dropzone({ overlap: 'center' })
    // only accept elements matching this CSS selector
    .accept('.res-handle')
    // listen for drop related events
    .on('dragenter', function (event) {
        if(event.target.classList.contains("drop-connected")) {
            return; // Dont allow a snap
        }
        var dropRect = interact.getElementRect(event.target),
            dropCenter = {
              x: dropRect.left + dropRect.width  / 2,
              y: dropRect.top  + dropRect.height / 2
            };

        event.draggable.snap({
          anchors: [ dropCenter ]
        });

        var draggableElement = event.relatedTarget,
            dropzoneElement = event.target;

        // feedback the possibility of a drop
        dropzoneElement.classList.add('drop-target');
        draggableElement.classList.add('can-drop');

        Circuit.connect(parseInt(event.relatedTarget.getAttribute('data-res')), 
            parseInt(event.target.getAttribute('data-zone')));
    })
    .on('dragleave', function (event) {
        if(!event.relatedTarget.classList.contains("res-connected")) {
            return; // Dont allow a snap
        }
        event.draggable.snap(false);

        // when leaving a dropzone, snap to the start position

        var startX = parseFloat(event.relatedTarget.getAttribute('data-sx'));
        var startY = parseFloat(event.relatedTarget.getAttribute('data-sy'));
        var newStartPos = {
            x: startX,
            y: startY
        }
        event.draggable.snap({ anchors: [newStartPos] });

        // remove the drop feedback style
        event.target.classList.remove('drop-target');
        event.relatedTarget.classList.remove('can-drop');
        event.target.classList.remove('drop-connected');
        event.relatedTarget.classList.remove('res-connected');

        Circuit.disconnect(parseInt(event.relatedTarget.getAttribute('data-res')), 
            parseInt(event.target.getAttribute('data-zone')));
        Circuit.check();
    })
    .on('dropactivate', function (event) {
        if(event.target.classList.contains("drop-connected")) {
            return; // Dont allow active
        }
        // add active dropzone feedback
        event.target.classList.add('drop-active');
    })
    .on('dropdeactivate', function (event) {
        // remove active dropzone feedback
        event.target.classList.remove('drop-active');
        event.target.classList.remove('drop-target');
    })
    .on('drop', function (event) {
        //event.relatedTarget.textContent = '';
        event.target.classList.add('drop-connected');
        event.relatedTarget.classList.add('res-connected');
        Circuit.check();
    });

        // interact('.dropzone').dropzone({
        //   // only accept elements matching this CSS selector
        //   accept: '.res-handle',
        //   // Require a 75% element overlap for a drop to be possible
        //   overlap: 0.1,

        //   // listen for drop related events:

        //   ondropactivate: function (event) {
        //     // add active dropzone feedback
        //     event.target.classList.add('drop-active');
        //   },
        //   ondragenter: function (event) {
        //     var draggableElement = event.relatedTarget,
        //         dropzoneElement = event.target;

        //     // feedback the possibility of a drop
        //     dropzoneElement.classList.add('drop-target');
        //     // draggableElement.classList.add('can-drop');
        //     // draggableElement.textContent = 'Dragged in';
        //   },
        //   ondragleave: function (event) {
        //     // remove the drop feedback style
        //     // event.target.classList.remove('drop-target');
        //     // event.relatedTarget.classList.remove('can-drop');
        //     // event.relatedTarget.textContent = 'Dragged out';

        //     event.relatedTarget.classList.remove('connected');
        //     Circuit.disconnect(parseInt(event.relatedTarget.getAttribute('data-res')), parseInt(event.target.getAttribute('data-zone')));
        //   },
        //   ondrop: function (event) {
        //     event.relatedTarget.classList.add('connected');
        //     event.relatedTarget.classList.add('connected');
        //     Circuit.connect(parseInt(event.relatedTarget.getAttribute('data-res')), parseInt(event.target.getAttribute('data-zone')));
        //   },
        //   ondropdeactivate: function (event) {
        //     // remove active dropzone feedback
        //     event.target.classList.remove('drop-active');
        //     event.target.classList.remove('drop-target');
        //   }
        // });


    document.addEventListener('dragstart', function (event) {
        event.preventDefault();
    });
});