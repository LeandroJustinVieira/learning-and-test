FROM php:7.2-apache

# configure mysql with mysqli and pdo
RUN docker-php-ext-install mysqli pdo_mysql

# configure xdebug
RUN pecl install xdebug-2.7.0
RUN docker-php-ext-enable xdebug
RUN echo "zend_extension=/usr/local/lib/php/extensions/no-debug-non-zts-20180731/xdebug.so" >> /usr/local/etc/php/php.ini
RUN echo "xdebug.remote_enable=1" >> /usr/local/etc/php/php.ini
RUN echo "xdebug.remote_handler=dbgp" >> /usr/local/etc/php/php.ini
RUN echo "xdebug.remote_host=127.0.0.1" >> /usr/local/etc/php/php.ini
RUN echo "xdebug.remote_port=9000" >> /usr/local/etc/php/php.ini
RUN echo "xdebug.remote_autostart=1" >> /usr/local/etc/php/php.ini