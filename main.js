        // Obtén una referencia al elemento de entrada de color y al div
        const colorPicker = document.getElementById("colorPicker");
        const miDiv = document.getElementById("miDiv");
        const rgbValue = document.getElementById("rgbValue");
        const hexValue = document.getElementById("hexValue");
        const hslValue = document.getElementById("hslValue");
        const cmykValue = document.getElementById("cmykValue");
        const hslaValue = document.getElementById("hslaValue");
        const hwbValue = document.getElementById("hwbValue");

        // Agrega un evento de cambio al input de color
        colorPicker.addEventListener("input", () => {
            // Obtén el valor del color seleccionado
            const colorSeleccionado = colorPicker.value;
            
            // Cambia el color de fondo del div según la tonalidad seleccionada
            miDiv.style.backgroundColor = colorSeleccionado;

            // Convierte el valor a RGB
            const rgbColor = hexToRgb(colorSeleccionado);

            // Convierte el valor a HSL
            const hslColor = rgbToHsl(rgbColor.r, rgbColor.g, rgbColor.b);

            // Convierte el valor a CMYK
            const cmykColor = rgbToCmyk(rgbColor.r, rgbColor.g, rgbColor.b);

            // Convierte el valor a HSLA
            const hslaColor = { ...hslColor, a: 1 };

            // Convierte el valor a HWB
            const hwbColor = rgbToHwb(rgbColor.r, rgbColor.g, rgbColor.b);

            // Actualiza los valores de color en los párrafos
            rgbValue.textContent = `RGB: ${rgbColor.r}, ${rgbColor.g}, ${rgbColor.b}`;
            hexValue.textContent = `HEX: ${colorSeleccionado}`;
            hslValue.textContent = `HSL: ${hslColor.h}, ${hslColor.s}%, ${hslColor.l}%`;
            cmykValue.textContent = `CMYK: ${cmykColor.c}%, ${cmykColor.m}%, ${cmykColor.y}%, ${cmykColor.k}%`;
            hslaValue.textContent = `HSLA: ${hslaColor.h}, ${hslaColor.s}%, ${hslaColor.l}%, ${hslaColor.a}`;
            hwbValue.textContent = `HWB: ${hwbColor.h}, ${hwbColor.w}%, ${hwbColor.b}%`;
        });

        // Función para convertir un valor HEX a RGB
        function hexToRgb(hex) {
            // Elimina el "#" si está presente
            hex = hex.replace(/^#/, '');

            // Convierte el valor HEX a RGB
            const bigint = parseInt(hex, 16);
            const r = (bigint >> 16) & 255;
            const g = (bigint >> 8) & 255;
            const b = bigint & 255;

            return { r, g, b };
        }

        // Función para convertir RGB a HSL
        function rgbToHsl(r, g, b) {
            r /= 255;
            g /= 255;
            b /= 255;
            const max = Math.max(r, g, b);
            const min = Math.min(r, g, b);
            let h, s, l = (max + min) / 2;

            if (max === min) {
                h = s = 0;
            } else {
                const d = max - min;
                s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
                switch (max) {
                    case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                    case g: h = (b - r) / d + 2; break;
                    case b: h = (r - g) / d + 4; break;
                }
                h /= 6;
            }

            // Redondea los valores
            h = Math.round(h * 360);
            s = Math.round(s * 100);
            l = Math.round(l * 100);

            return { h, s, l };
        }

        // Función para convertir RGB a CMYK
        function rgbToCmyk(r, g, b) {
            r /= 255;
            g /= 255;
            b /= 255;

            const k = 1 - Math.max(r, g, b);
            const c = (1 - r - k) / (1 - k);
            const m = (1 - g - k) / (1 - k);
            const y = (1 - b - k) / (1 - k);

            // Redondea los valores
            const round = value => Math.round(value * 100);
            return { c: round(c), m: round(m), y: round(y), k: round(k) };
        }

        // Función para convertir RGB a HWB
        function rgbToHwb(r, g, b) {
            r /= 255;
            g /= 255;
            b /= 255;

            const max = Math.max(r, g, b);
            const min = Math.min(r, g, b);
            const h = rgbToHsl(r, g, b).h;
            const w = 1 - max;
            const bVal = 1 - min;

            // Redondea los valores
            return { h: Math.round(h * 360), w: Math.round(w * 100), b: Math.round(bVal * 100) };
        }