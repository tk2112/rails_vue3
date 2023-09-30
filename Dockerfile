# 参考：https://qiita.com/croquette0212/items/7b99d9339fd773ddf20b
FROM ruby:3.1.3

# aptアップデート
RUN apt update

RUN mkdir /apps
WORKDIR /apps

COPY apps/Gemfile /apps/Gemfile
COPY apps/Gemfile.lock /apps/Gemfile.lock

# Bundlerの不具合対策
RUN gem update --system
RUN bundle update --bundler

RUN bundle install

COPY entrypoint.sh /usr/bin/
RUN chmod +x /usr/bin/entrypoint.sh && \
    cp /usr/share/zoneinfo/Asia/Tokyo /etc/localtime
ENTRYPOINT ["entrypoint.sh"]

EXPOSE 3000

# Start the main process.
CMD ["rails", "server", "-b", "0.0.0.0"]
