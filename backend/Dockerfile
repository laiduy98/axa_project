FROM python:slim-bullseye

ENV FLASK_APP=server.py

WORKDIR /python-docker

COPY requirements.txt requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 5000


# CMD ["python", "server.py"]
# CMD ["flask", "run", "--host=0.0.0.0"]
