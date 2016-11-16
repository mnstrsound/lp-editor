<?php

    class PageCreator {
        private static function createNode($item) {
            $cls = join($item['cls'], ' ');
            $attrs = self::getAttrs($item['attrs']);
            $node = "<${item['tag']} class=\"${cls}\"${attrs}>";
            if (isset($item['children']) && is_array($item['children'])) {
                foreach ($item['children'] as $child) {
                    $node .= self::createNode($child);
                }
            }
            if (isset($item['children']) && is_string($item['children'])) {
                $node .= $item['children'];
            }
            $node .= "</${item['tag']}>";
            return $node;
        }

        private static function getAttrs($attrs) {
            $attributes = '';
            foreach ($attrs as $key => $value) {
                $attributes .= " ${key}=\"${value}\"";
            }
            return $attributes;
        }

        public static function makeMarkup($page) {
            $PageSettings = $page['PageSettings']['settings'];
            $Markup = $page['Markup']['nodes'];
            $keywords = $PageSettings['keywords']['content'];
            $description = $PageSettings['description']['content'];
            $title = $PageSettings['title'];
            $output = "<html><head>";
            $output .= "<title>${title}</title>";
            $output .= "<meta name=\"keywords\" content=\"${keywords}\" />";
            $output .= "<meta name=\"description\" content=\"${description}\" />";
            foreach ($PageSettings['metas'] as $meta) {
                $attrs = self::getAttrs($meta);
                $output .= "<meta${attrs}>";
            }
            foreach ($PageSettings['links'] as $link) {
                $attrs = self::getAttrs($link);
                $output .= "<link${attrs}>";
            }
            foreach ($PageSettings['scripts'] as $script) {
                $attrs = self::getAttrs($script);
                $output .= "<script${attrs}></script>";
            }
            $output .= "</head><body>";
            $output .= self::createNode($Markup);
            foreach ($PageSettings['customScripts'] as $script) {
                $src = $script['type'] === "url" ? " src=\"" . $script['content'] . "\"" : "";
                $content = $script['type'] === "code" ? $script['content'] : "";
                $output .= "<script${src}>${content}</script>";
            }
            $output .= '</body></html>';
            return $output;
        }
    }